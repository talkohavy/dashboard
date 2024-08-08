import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { DASHBOARD_DEFAULT_RESIZE_HANDLERS } from '../constants';
import FakeResizeHandle from '../FakeResizeHandler';
import { HandlerPositions } from '../types';
import styles from './Widget.module.scss';

type WidgetProps = PropsWithChildren<{
  gapBetweenWidgets?: number;
  axisHandlerPositions?: Array<HandlerPositions>;
  className?: string;
}>;

export function Widget(props: WidgetProps) {
  const {
    children,
    gapBetweenWidgets = 10,
    axisHandlerPositions = DASHBOARD_DEFAULT_RESIZE_HANDLERS,
    className,
  } = props;

  return (
    <div className={styles.widgetHolderWithGap} style={{ padding: gapBetweenWidgets }}>
      <div className={clsx('custom-widget', styles.widget, className)}>
        {children}

        {axisHandlerPositions.map((position) => (
          <FakeResizeHandle key={position} handleAxis={position} />
        ))}
      </div>
    </div>
  );
}
