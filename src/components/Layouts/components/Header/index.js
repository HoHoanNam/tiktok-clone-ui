import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGear,
  faGlobe,
  faCoins,
  faSignOut,
  faKeyboard,
  faCircleQuestion,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

import Search from '../Search';
import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faGlobe} />,
    title: 'English',
    children: {
      title: 'Languages',
      data: [
        { code: 'EN', title: 'English' },
        { code: 'NL', title: 'Dutch' },
        { code: 'DE', title: 'German' },
        { code: 'FR', title: 'French' },
        { code: 'ZH', title: 'Chinese' },
        { code: 'JA', title: 'Japanese' },
        { code: 'VI', title: 'Vietnamese' },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and Help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  let currentUser = true;

  // Handle logic
  const handleMenuChange = (menuItem) => {
    console.log(menuItem);
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to: '/@user',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to: '/coin',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to: '/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to: '/logout',
      seperate: true,
    },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="Tiktok" />
        </div>

        <Search />

        <div className={cx('actions')}>
          {currentUser ? (
            <div className={cx('current-user')}>
              <Tippy delay={[0, 50]} content="Upload video" placement="bottom">
                <button className={cx('action-btn')}>
                  <UploadIcon className={cx('icon-img')} />
                </button>
              </Tippy>

              <Tippy delay={[0, 50]} content="Messages" placement="bottom">
                <button className={cx('action-btn')}>
                  <MessageIcon className={cx('icon-img')} />
                </button>
              </Tippy>

              <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                <button className={cx('action-btn', 'badge')}>
                  <InboxIcon className={cx('icon-img')} />
                  <span className={cx('quantity')}>8</span>
                </button>
              </Tippy>
            </div>
          ) : (
            <>
              <Button text>Upload</Button>
              <Button primary>Log in</Button>
            </>
          )}

          <Menu
            items={currentUser ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <Image
                src={images.avatar}
                className={cx('user-avatar')}
                alt="Avatar"
                fallback={images.fallbackImage}
              />
            ) : (
              <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
