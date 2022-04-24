import { ReactNode } from 'react';
import styles from './modal.module.scss';

export default function Modal({
  title,
  children,
  className
}: {
  title: string,
  children: ReactNode,
  className?: string
}): JSX.Element {
  return (
    <div className={`${styles['modal']} ${className ? className : ''}`}>
      <div className={styles['modal-header']}>{title}</div>
      <div className={styles['modal-body']}>{children}</div>
    </div>
  );
}