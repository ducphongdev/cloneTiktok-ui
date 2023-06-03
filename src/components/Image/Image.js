import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import { images } from '~/assets/images';
import styles from './image.module.scss';

function Image({ src, alt, className, fallBack: customFallBack = images.noImage, ...probs }, ref) {
  const [fallBack, setFallBack] = useState('');

  const handleError = () => {
    setFallBack(customFallBack);
  };
  return (
    <img
      ref={ref}
      className={classNames(styles.wrapper, className)}
      alt={alt}
      src={fallBack || src}
      {...probs}
      onError={handleError}
    />
  );
}

export default forwardRef(Image);
