import { HandlerPositions } from './types';

const DASHBOARD_DEFAULT_COLUMN_COUNT = 8;
const DASHBOARD_DEFAULT_ROW_HEIGHT = 50;
const DASHBOARD_DEFAULT_GAP_FROM_WALLS = 10;
const DASHBOARD_DEFAULT_LINES_COLOR = '#777';
const DASHBOARD_DEFAULT_BREAKPOINT_SIZES = { lg: 50 };
const DASHBOARD_DEFAULT_RESIZE_HANDLERS: Array<HandlerPositions> = ['se'];

const COMPACT_TYPE = {
  'to-top': 'vertical',
  'to-left': 'horizontal',
  'free-form': null,
};

export {
  COMPACT_TYPE,
  DASHBOARD_DEFAULT_BREAKPOINT_SIZES,
  DASHBOARD_DEFAULT_COLUMN_COUNT,
  DASHBOARD_DEFAULT_GAP_FROM_WALLS,
  DASHBOARD_DEFAULT_LINES_COLOR,
  DASHBOARD_DEFAULT_RESIZE_HANDLERS,
  DASHBOARD_DEFAULT_ROW_HEIGHT,
};
