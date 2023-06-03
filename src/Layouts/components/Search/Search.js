import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import className from 'classnames/bind';
import styles from './Search.module.scss';
import HeaderTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hook';
import * as searchServices from '~/services/searchService';

const cx = className.bind(styles);
function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hook tự thiết kế
  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    setLoading(true);

    const fetchApi = async () => {
      try {
        const res = await searchServices.search(debouncedValue);

        setSearchResult(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchApi();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  // Xử lý input search
  const hanldeChange = (e) => {
    let searchValue = e.target.value;
    if (searchValue.startsWith(' ')) {
      return;
    } else {
      setSearchValue(searchValue);
    }
  };

  const hanleMouse = (e) => {
    e.preventDefault();
  };
  return (
    <HeaderTippy
      interactive="true"
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <div className={cx('search-results')} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            Ket qua
            <h4 className={cx('search-title')}>Tai khoan</h4>
            {searchResult.map((result) => (
              <AccountItem key={result.id} data={result} />
            ))}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchValue}
          placeholder="Seach accountItem videos"
          spellCheck="false"
          onChange={hanldeChange}
          onFocus={() => setShowResult(true)}
        />
        {!!searchValue && !loading ? (
          <button className={cx('clear')} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        ) : (
          ''
        )}
        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

        <button className={cx('search-btn')} onMouseDown={hanleMouse}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeaderTippy>
  );
}

export default Search;
