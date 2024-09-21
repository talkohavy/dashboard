import { DashboardData, DashboardSettings } from '../../dist/main';

enum WidgetTypes {
  Text = 'text',
}

export const dashboardSettings: DashboardSettings = {
  dashboard: {
    floatType: 'free-form',
    gapFromWalls: 0,
  },
  grid: {
    alwaysVisible: true,
    rowHeight: 50,
    columnCount: 12,
  },
  widgets: {
    axisHandlerPositions: ['se'],
  },
};

export const data: DashboardData<WidgetTypes> = [
  {
    i: 'aaa',
    type: WidgetTypes.Text,
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    props: {},
  },
  {
    i: 'bbb',
    type: WidgetTypes.Text,
    x: 2,
    y: 2,
    w: 3,
    h: 3,
    static: true,
    props: {},
  },
];
