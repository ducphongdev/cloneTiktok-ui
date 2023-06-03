import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import Header from './Header';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logout } from '~/redux/authSlice';

const cx = classNames.bind(styles);
const defaultFn = () => {};

function Menu({ children, items, hideOnClick = false, onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const dispatch = useDispatch();

  useEffect(() => {
    setHistory([{ data: items }]);
  }, [items]);

  // Xử lý click Logout
  const handleUserLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          to={item.to}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prve) => [...prve, item.children]);
            } else {
              if (item.logout) {
                handleUserLogout();
              }
              onChange(item);
            }
          }}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx('menu-popper')}>
        {history.length > 1 && <Header icon={faChevronLeft} title={current.title} onBack={handleBack} />}
        <div className={cx('menu-scollable')}>{renderItems()}</div>
      </PopperWrapper>
    </div>
  );

  // Reset to first page
  const handleReset = () => setHistory((prev) => prev.slice(0, 1));
  return (
    <Tippy
      hideOnClick={hideOnClick}
      offset={[12, 8]}
      interactive="true"
      delay={[0, 500]}
      placement="bottom-end"
      render={renderResult}
      onHide={handleReset}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};
export default Menu;
