import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import images from '~/assets/images';
import { SearchIcon } from '~/components/Icons';
import AccountItem from '~/components/AccountItem';
import { PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 2, 3]);
    }, 2000);
  }, []);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <HeadlessTippy
      interactive
      appendTo={() => document.body}
      visible={showResult && searchResult.length > 0}
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
      // onblur ra khỏi trigger element của Tippyjs
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          spellCheck={false}
          value={searchValue}
          placeholder="Search accounts and videos"
          onFocus={() => setShowResult(true)}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        {!!searchValue && (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

        <button className={cx('search-btn')}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
