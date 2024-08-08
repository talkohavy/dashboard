import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './DashboardWrapper.module.scss';

type DashboardCardProps = PropsWithChildren<{
  className?: string;
  style: any;
  testId?: string;
}>;

export default function DashboardWrapper(props: DashboardCardProps) {
  const { className, style, children, testId } = props;

  return (
    <div
      className={clsx(styles.dashboardWrapper, className ?? styles.defaultDashboardWrapperStyle)}
      style={style}
      data-test-id={testId}
    >
      {children}
    </div>
  );
}
