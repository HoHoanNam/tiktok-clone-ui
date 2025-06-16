import { useState, useRef, cloneElement } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import Header from './Header';
import MenuItem from './MenuItem';
import { PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  // currentMenu là phần tử cuối cùng của mảng (obj)
  const currentMenu = history[history.length - 1];

  // Tạo ref cho phần tử kích hoạt (Trigger element)
  const triggerRef = useRef();

  const renderItems = () => {
    return currentMenu.data.map((item, index) => {
      // Convert sang kiểu boolean
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      offset={[12, 8]}
      placement="bottom-end"
      appendTo={document.body}
      // Có thể dùng để để tách trigger element ra một phần tử khác
      // thay vì để mặc định là <Tippy>{children}</Tippy>
      reference={triggerRef}
      render={(attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>
            {history.length > 1 && (
              <Header
                title={currentMenu.title}
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1));
                }}
              />
            )}
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistory((prev) => prev.slice(0, 1))}
    >
      {/* Truyền ref xuống children */}
      {cloneElement(children, { ref: triggerRef })}
    </Tippy>
  );
}

export default Menu;
