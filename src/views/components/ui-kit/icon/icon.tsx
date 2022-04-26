import { IconColor, IconVariant } from '../../../../data/types';
import styles from './icon.module.scss';

export default function Icon({
  variant,
  color,
  className
}: {
  variant: IconVariant;
  color?: IconColor;
  className?: string;
}): JSX.Element {
  return (
    <span className={`
      ${styles['icon']}
      ${styles[`icon-${variant}`]}
      ${!!color ? styles['icon__mask'] : ''}
      ${!!color ? styles[`icon__${color}`] : ''}
      
      ${className ? className : ''}
    `} />
  );
}
