import { useMemo } from 'react';
import { DASHBOARD_DEFAULT_LINES_COLOR } from '../../../constants';
import styles from './VerticalLines.module.scss';

type VerticalLinesProps = {
  verticalLinesCount: number;
  height: number;
  color: string;
};

export default function VerticalLines(props: VerticalLinesProps) {
  const { verticalLinesCount, height, color = 'black' } = props;

  const verticalLines = useMemo(() => Array.from(Array(verticalLinesCount).keys()), [verticalLinesCount]);

  return (
    <div className={styles.verticalLines} style={{ left: 0, top: 0 }}>
      {verticalLines.map((_, index) => (
        <div
          key={`vertical-line-${index}`}
          className={styles.singleVerticalLine}
          style={{ borderColor: color ?? DASHBOARD_DEFAULT_LINES_COLOR, height }}
        />
      ))}
    </div>
  );
}
