import { DashboardData, DashboardSettings } from '../../../lib/main';

export enum WidgetTypes1 {
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

export const widgetsArr: DashboardData<WidgetTypes1> = [
  {
    i: 'aaa',
    type: WidgetTypes1.Text,
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    props: {
      text: 'hello',
    },
  },
  {
    i: 'bbb',
    type: WidgetTypes1.Text,
    x: 2,
    y: 2,
    w: 3,
    h: 3,
    static: true,
    props: {
      text: 'world',
    },
  },
];
