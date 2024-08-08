import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <button {...props} className={clsx(props.className, styles.button)}>
      Click Me
    </button>
  );
}
