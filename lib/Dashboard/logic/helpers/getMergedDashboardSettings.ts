import { DashboardMergedSettings, DashboardSettings } from '../../types.ts';
import {
  COMPACT_TYPE,
  DASHBOARD_DEFAULT_BREAKPOINT_SIZES,
  DASHBOARD_DEFAULT_COLUMN_COUNT,
  DASHBOARD_DEFAULT_GAP_FROM_WALLS,
  DASHBOARD_DEFAULT_LINES_COLOR,
  DASHBOARD_DEFAULT_ROW_HEIGHT,
} from '../constants';

type getMergedDashboardSettingsProps = {
  settingsToMerge?: DashboardSettings;
};

function getMergedDashboardSettings(props: getMergedDashboardSettingsProps): DashboardMergedSettings {
  const { settingsToMerge } = props;
  const { dashboard, grid } = settingsToMerge ?? {};

  const columnsCount = grid?.columnCount ?? DASHBOARD_DEFAULT_COLUMN_COUNT;

  return {
    grid: {
      alwaysVisible: grid?.alwaysVisible ?? false,
      props: {
        verticalLinesCount: columnsCount + 1, // <--- this value should match (dashboard.props.cols.lg + 1) exactly.
        color: grid?.color ?? DASHBOARD_DEFAULT_LINES_COLOR,
      },
    },
    dashboard: {
      gapFromWalls: dashboard?.gapFromWalls ?? DASHBOARD_DEFAULT_GAP_FROM_WALLS,
      props: {
        // dynamic values:
        isBounded: dashboard?.isBounded ?? false,
        allowOverlap: dashboard?.allowOverlap ?? false,
        compactType: COMPACT_TYPE[dashboard?.floatType ?? 'to-top'] as any,
        cols: { lg: columnsCount },
        rowHeight: grid?.rowHeight ?? DASHBOARD_DEFAULT_ROW_HEIGHT, // <--- if `undefined` (which currently is impossible), react-grid-layout defaults to 150
        // fixed values:
        breakpoints: { lg: DASHBOARD_DEFAULT_BREAKPOINT_SIZES.lg },
        margin: { lg: [0, 0] },
        containerPadding: [0, 0],
        resizeHandles: ['se', 'sw'],
      },
    },
  };
}

export { getMergedDashboardSettings };
