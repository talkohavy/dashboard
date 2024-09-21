import { Layout } from 'react-grid-layout';

export type DashboardData<T = string> = Array<IWidget<T>>;

export type DashboardMergedSettings = {
  grid: {
    alwaysVisible: boolean;
    props: {
      verticalLinesCount: number;
      color: string;
    };
  };
  dashboard: {
    gapFromWalls: number;
    props: {
      isBounded: boolean;
      allowOverlap: boolean;
      breakpoints: any;
      compactType: 'vertical' | 'horizontal' | null;
      cols: any; // <--- defaults to 12. Number of columns in this layout.
      margin: any; // <--- I once used this to give margin between widgets, but today I do that by putting a padding on the Widget component.
      containerPadding: any;
      rowHeight: number;
      resizeHandles: Array<'se' | 'sw' | 'ne' | 'nw' | 'n' | 's' | 'e' | 'w'>;
    };
  };
};

export type DashboardSettings = {
  grid?: {
    /**
     * @default false
     */
    alwaysVisible?: boolean;
    /**
     * @default '#777'
     */
    color?: string;
    /**
     * @default 8
     */
    columnCount?: number;
    /**
     * row's height in pixels
     */
    rowHeight?: number;
  };
  dashboard?: {
    /**
     * @default false
     */
    isBounded?: boolean;
    /**
     * @default 10
     */
    gapFromWalls?: number;
    /**
     * @default 'to-top'
     */
    floatType?: 'to-top' | 'to-left' | 'free-form';
    /**
     * If true, grid can be placed one over the other.
     * @default false
     */
    allowOverlap?: boolean;
  };
  widgets?: {
    /**
     * @default ['se']
     */
    axisHandlerPositions?: Array<HandlerPositions>;
  };
};

export type HandlerPositions = 'se' | 'sw' | 'ne' | 'nw' | 'n' | 's' | 'e' | 'w';

export type IWidget<T = string> = {
  id?: string;
  type: T;
  props: any;
} & Layout;

export type OnChangeLayoutProps = {
  newLayout: Array<Layout>;
  widgetBefore: Layout;
  widgetAfter: Layout;
};

export type OnResizeOrDragStopProps = OnChangeLayoutProps;
