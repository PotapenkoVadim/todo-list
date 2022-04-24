import { ReactNode } from 'react';
import styles from './modal.module.scss';

export default function Modal({
  title,
  children
}: {
  title: string,
  children: ReactNode
}): JSX.Element {
  return (
    <div className={styles['modal']}>
      <div className={styles['modal-header']}>{title}</div>
      <div className={styles['modal-body']}>{children}</div>
    </div>
  );
}