import clsx from 'clsx';
import { CLASSES } from '../../../../../constants.ts';
import styles from './FakeResizeHandler.module.scss';

type ResizeHandlerPos = { handleAxis?: string };

export default function FakeResizeHandle(props: ResizeHandlerPos) {
  const { handleAxis = 'se' } = props;

  return (
    <div
      className={clsx(
        CLASSES.fakeResizeHandle,
        `${CLASSES.fakeResizeHandle}-${handleAxis}`,
        styles.resizeHandle,
        styles.defaultResizeHandleStyle,
        styles[handleAxis],
      )}
    />
  );
}
