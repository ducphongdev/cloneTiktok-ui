import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './SuggestedAccounts.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function Account({ data }) {
  const renderReview = (props) => {
    return (
      <div className={cx('account-result')} tabIndex="-1" {...props}>
        <PopperWrapper>
          <AccountPreview data={data} />
        </PopperWrapper>
      </div>
    );
  };

  return (
    <div>
      <Tippy interactive offset={[-20, 0]} delay={[500, 500]} placement="bottom" render={renderReview}>
        <div className={cx('account-item')}>
          <img className={cx('avatar')} src={data.avatar} />
          <div className={cx('body')}>
            <div className={cx('nickname')}>
              <h4>{data.nickname}</h4>
              <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
            </div>
            <p className={cx('name')}>{`${data.first_name + ' ' + data.last_name} `}</p>
          </div>
        </div>
      </Tippy>
    </div>
  );
}

export default Account;
