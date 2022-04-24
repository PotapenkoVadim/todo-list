import { ReactNode } from 'react';
import { ButtonType } from '../../../../data/types';
import styles from './button.module.scss';

export default function Button({
  children,
  onClick,
  className,
  type
}:{
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: ButtonType;
}): JSX.Element {
  return (
    <button onClick={onClick} className={`${styles['button']} ${styles[`button-${type ?? 'primary'}`]} ${className ? className : ''}`}>
      { children }
    </button>
  );
}