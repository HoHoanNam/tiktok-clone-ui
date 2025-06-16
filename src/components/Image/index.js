import { useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './Image.module.scss';

const cx = classNames.bind(styles);

const Image = forwardRef(
  (
    { src, className, fallback: customFallback = images.noImage, ...props },
    ref,
  ) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
      setFallback(customFallback);
    };

    return (
      <img
        ref={ref}
        src={fallback || src}
        className={cx('wrapper', className)}
        {...props}
        onError={handleError}
      />
    );
  },
);

export default Image;
