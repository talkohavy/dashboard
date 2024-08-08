import styles from './Label.module.scss';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label(props: LabelProps) {
  return (
    <label {...props} className={styles.label}>
      Label
    </label>
  );
}
