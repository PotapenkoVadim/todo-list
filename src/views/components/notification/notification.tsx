import styles from './notification.module.scss';

export default function Notification({ text }:{ text: string }): JSX.Element {
  return (
    <div className={styles['notification']}>{ text }</div>
  );
}