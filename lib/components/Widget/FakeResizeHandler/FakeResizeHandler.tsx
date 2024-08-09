import clsx from 'clsx';
import styles from './FakeResizeHandler.module.scss';

type ResizeHandlerPos = { handleAxis?: string };

export default function FakeResizeHandle(props: ResizeHandlerPos) {
  const { handleAxis = 'se' } = props;

  return (
    <div
      className={clsx(
        'fake-resizable-handle',
        `fake-resizable-handle-${handleAxis}`,
        styles.resizeHandle,
        styles[handleAxis],
      )}
    />
  );
}
