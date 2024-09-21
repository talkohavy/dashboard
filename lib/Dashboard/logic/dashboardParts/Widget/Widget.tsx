import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { CLASSES } from '../../../../constants.ts';
import { HandlerPositions } from '../../../types.ts';
import { DASHBOARD_DEFAULT_RESIZE_HANDLERS } from '../../constants.ts';
import FakeResizeHandle from './FakeResizeHandler';
import styles from './Widget.module.scss';

type WidgetProps = PropsWithChildren<{
  gapBetweenWidgets?: number;
  axisHandlerPositions?: Array<HandlerPositions>;
  className?: string;
}>;

export default function Widget(props: WidgetProps) {
  const {
    children,
    gapBetweenWidgets = 10,
    axisHandlerPositions = DASHBOARD_DEFAULT_RESIZE_HANDLERS,
    className,
  } = props;

  return (
    <div className={styles.widgetHolderWithGap} style={{ padding: gapBetweenWidgets }}>
      <div className={clsx(CLASSES.widget, styles.widget, styles.defaultWidgetStyle, className)}>
        {children}

        {axisHandlerPositions.map((position) => (
          <FakeResizeHandle key={position} handleAxis={position} />
        ))}
      </div>
    </div>
  );
}
