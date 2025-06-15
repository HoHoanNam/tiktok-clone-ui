import { useState } from 'react';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faGear,
  faGlobe,
  faCoins,
  faMessage,
  faSignOut,
  faSpinner,
  faKeyboard,
  faCircleXmark,
  faCloudArrowUp,
  faCircleQuestion,
  faMagnifyingGlass,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import AccountItem from '~/components/AccountItem';
import { PopperWrapper } from '~/components/Popper';

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
  const [searchResult, setSearchResult] = useState([1, 2]);

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

        <HeadlessTippy
          interactive
          appendTo={document.body}
          visible={searchResult.length > 0}
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                <AccountItem
                  src={images.searchAvatars[0]}
                  alt="Lakers"
                  name="Lakers"
                  username="lakers"
                />
                <AccountItem
                  src={images.searchAvatars[0]}
                  alt="Lakers"
                  name="Lakers"
                  username="lakers"
                />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input
              placeholder="Search accounts and videos"
              spellCheck={false}
            />
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadlessTippy>

        <div className={cx('actions')}>
          {currentUser ? (
            <div className={cx('current-user')}>
              <Tippy delay={[0, 200]} content="Upload video" placement="bottom">
                <button className={cx('action-btn')}>
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </button>
              </Tippy>

              <button className={cx('action-btn')}>
                <FontAwesomeIcon icon={faMessage} />
              </button>
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
              <img
                src={images.avatar}
                className={cx('user-avatar')}
                alt=""
                width={300}
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
