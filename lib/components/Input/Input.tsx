import styles from './Input.module.scss';

type TextProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: TextProps) {
  return (
    <div {...props} className={`${props.className} ${styles.input}`}>
      Text
    </div>
  );
}
