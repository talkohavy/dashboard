import { useMemo } from 'react';
import { DASHBOARD_DEFAULT_LINES_COLOR } from '../../../constants';
import styles from './HorizontalLines.module.scss';

type HorizontalLinesProps = {
  horizontalLinesCount: number;
  rowHeight: number;
  color: string;
};

export default function HorizontalLines(props: HorizontalLinesProps) {
  const { horizontalLinesCount, rowHeight, color } = props;

  const horizontalLines = useMemo(() => {
    const howManyLines = Math.max(0, horizontalLinesCount - 1);

    return Array.from(Array(howManyLines).keys());
  }, [horizontalLinesCount]);

  return (
    <div className={styles.horizontalLines}>
      {horizontalLines.map((_, index) => (
        <div
          key={`horizontal-line-${index}`}
          className={styles.singleHorizontalLine}
          style={{
            borderColor: color ?? DASHBOARD_DEFAULT_LINES_COLOR,
            height: rowHeight,
            borderTop: index === 0 ? `1px dashed ${color ?? DASHBOARD_DEFAULT_LINES_COLOR}` : undefined,
          }}
        />
      ))}
    </div>
  );
}
