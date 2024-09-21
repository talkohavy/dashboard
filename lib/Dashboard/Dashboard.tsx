import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import styles from './Dashboard.module.scss';
import { DASHBOARD_DEFAULT_ROW_HEIGHT } from './logic/constants.ts';
import DashboardWrapper from './logic/dashboardParts/DashboardWrapper/DashboardWrapper.tsx';
import GridOverlay from './logic/dashboardParts/GridOverlay/GridOverlay.tsx';
import { getMergedDashboardSettings } from './logic/helpers/getMergedDashboardSettings.ts';
import { runValidationsOnData } from './logic/helpers/runValidationsOnData.ts';
import { DashboardSettings, OnChangeLayoutProps, OnResizeOrDragStopProps } from './types';
import 'react-grid-layout/css/styles.css';
import '../dashboards.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = PropsWithChildren<{
  data: Array<Layout>;
  settings?: DashboardSettings;
  onLayoutChange?: (props: OnChangeLayoutProps) => void;
  className?: string;
  testId?: string;
}>;

export default function Dashboard(props: DashboardProps) {
  const { data, settings: settingsToMerge, onLayoutChange, children, className, testId = '' } = props;

  useMemo(() => runValidationsOnData(data), [data]);

  const dashboardRef = useRef<any>();
  const prevVerticalLinesHeight = useRef(0);
  const prevHorizontalLinesCount = useRef(0);

  const [isShowGridLines, setIsShowGridLines] = useState(false);
  const [horizontalLinesCount, setHorizontalLinesCount] = useState(0);
  const [verticalLinesHeight, setVerticalLinesHeight] = useState(0);

  const settings = useMemo(() => getMergedDashboardSettings({ settingsToMerge }), [settingsToMerge]);

  const onResizeOrDragStart = () => setIsShowGridLines(true);

  const onResizeOrDragStop = (props: OnResizeOrDragStopProps) => {
    const { newLayout, widgetBefore, widgetAfter } = props;
    setIsShowGridLines(false);

    const hasChanged = !isEqual(widgetBefore, widgetAfter);

    if (hasChanged) onLayoutChange?.({ newLayout, widgetBefore, widgetAfter });
  };

  const setHorizontalLinesCountAndVerticalLinesHeight = useCallback(
    ({ dashboardHeight = 0 }) => {
      const rowHeight = settings.dashboard.props.rowHeight ?? DASHBOARD_DEFAULT_ROW_HEIGHT;

      // Step 1: calculate verticalLinesHeight
      const newMaxHeight = Math.max(dashboardRef.current.clientHeight, dashboardHeight);
      const newVerticalLinesHeight = Math.floor(newMaxHeight / rowHeight) * rowHeight;
      if (prevVerticalLinesHeight.current === newVerticalLinesHeight) return;
      prevVerticalLinesHeight.current = newVerticalLinesHeight;

      // Step 2: calculate horizontalLinesCount from verticalLinesHeight
      const newHorizontalLinesCount = Math.ceil((newVerticalLinesHeight + 1) / rowHeight);
      if (prevHorizontalLinesCount.current === newHorizontalLinesCount) return;
      prevHorizontalLinesCount.current = newHorizontalLinesCount;

      setHorizontalLinesCount(newHorizontalLinesCount);
      setVerticalLinesHeight(newVerticalLinesHeight);
    },
    [settings.dashboard.props.rowHeight],
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries: any) => {
      const [{ borderBoxSize }] = entries;
      const [{ blockSize: dashboardHeight }] = borderBoxSize;
      setHorizontalLinesCountAndVerticalLinesHeight({ dashboardHeight });
    });

    observer.observe(dashboardRef.current as any);

    return () => observer.disconnect();
  }, [setHorizontalLinesCountAndVerticalLinesHeight]);

  const onDragCalculateVerticalGridLinesHeight = (newLayout: Array<Layout>) => {
    const rowHeight = settings.dashboard.props.rowHeight ?? DASHBOARD_DEFAULT_ROW_HEIGHT;

    const maxHeight = newLayout.reduce((maxHeight: number, currentWidget: Layout) => {
      const currentWidgetHeight = currentWidget.y + currentWidget.h;
      if (maxHeight < currentWidgetHeight) return currentWidgetHeight;

      return maxHeight;
    }, 0);

    // Step 1: calculate verticalLine height
    const heightOfDashboardBoxWrapper = dashboardRef.current.clientHeight;
    const heightNeededForLowestWidget = maxHeight * rowHeight;
    const newVerticalLinesHeight = Math.max(heightNeededForLowestWidget, heightOfDashboardBoxWrapper);

    setVerticalLinesHeight(newVerticalLinesHeight);

    // Step 2: calculate horizontalLinesCount from verticalLinesHeight
    const newHorizontalLinesCount = Math.ceil((newVerticalLinesHeight + 1) / rowHeight);
    if (prevHorizontalLinesCount.current === newHorizontalLinesCount) return;
    prevHorizontalLinesCount.current = newHorizontalLinesCount;

    setHorizontalLinesCount(newHorizontalLinesCount);
  };

  return (
    <DashboardWrapper
      className={className}
      style={{ direction: 'ltr', padding: settings.dashboard.gapFromWalls }}
      testId={testId}
    >
      <div
        className={clsx(styles.dashboard, 'dashboard-grab-handler')}
        ref={dashboardRef}
        onScroll={setHorizontalLinesCountAndVerticalLinesHeight as any}
      >
        {(settings.grid.alwaysVisible || isShowGridLines) && (
          <GridOverlay
            {...settings.grid.props}
            rowHeight={settings.dashboard.props.rowHeight}
            horizontalLinesCount={horizontalLinesCount}
            height={verticalLinesHeight}
          />
        )}

        <ResponsiveGridLayout
          autoSize // If true, the container height swells and contracts to fit contents.
          draggableCancel='.do-not-drag-me' // <--- A CSS selector for tags that will not be draggable. If you forget the leading . it will not work. .react-resizable-handle is always prepended to this value.
          layouts={{ lg: data }}
          {...settings.dashboard.props}
          onDragStart={(newLayout: Array<Layout>) => {
            onResizeOrDragStart();
            onDragCalculateVerticalGridLinesHeight(newLayout);
          }}
          onResizeStart={(newLayout: Array<Layout>) => {
            onResizeOrDragStart();
            onDragCalculateVerticalGridLinesHeight(newLayout);
          }}
          onDragStop={(newLayout: Array<Layout>, widgetBefore: Layout, widgetAfter: Layout) => {
            onResizeOrDragStop({ newLayout, widgetBefore, widgetAfter });
          }}
          onResizeStop={(newLayout: Array<Layout>, widgetBefore: Layout, widgetAfter: Layout) => {
            onResizeOrDragStop({ newLayout, widgetBefore, widgetAfter });
            onDragCalculateVerticalGridLinesHeight(newLayout);
          }}
          onDrag={onDragCalculateVerticalGridLinesHeight}
          style={{ height: '100%' }} // <--- without this, react-grid-layout calculates a fixed value for the height based on highest stacked "tower" of widgets.
        >
          {children}
        </ResponsiveGridLayout>
      </div>
    </DashboardWrapper>
  );
}
