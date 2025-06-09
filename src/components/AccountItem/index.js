import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ src, alt, name, username }) {
  return (
    <div className={cx('wrapper')}>
      <img className={cx('avatar')} src={src} alt={alt} />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{name}</span>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </h4>
        <span className={cx('username')}>{username}</span>
      </div>
    </div>
  );
}

export default AccountItem;
