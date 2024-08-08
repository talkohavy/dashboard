import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './Undraggable.module.scss';

type UndraggableProps = PropsWithChildren<{
  className?: string;
  style?: any;
}>;

export default function Undraggable(props: UndraggableProps) {
  const { children, className, style } = props;

  return (
    <div className={clsx('do-not-drag-me', styles.undraggable, className)} style={style}>
      {children}
    </div>
  );
}
