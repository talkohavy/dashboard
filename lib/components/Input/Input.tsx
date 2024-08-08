import styles from './Input.module.scss';

type TextProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: TextProps) {
  return (
    <div {...props} className={`${props.className} ${styles.input}`}>
      Text
    </div>
  );
}
