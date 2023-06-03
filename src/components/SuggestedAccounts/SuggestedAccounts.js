import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ lable, data, onSeeAll, isSeeAll }) {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('fllowing-account')}>{lable}</p>
      {data.map((result) => (
        <AccountItem key={result.id} data={result} />
      ))}
      <div onClick={onSeeAll} className={cx('more-btn')}>
        <p>{isSeeAll}</p>
      </div>
    </div>
  );
}

SuggestedAccounts.propTypes = {
  lable: PropTypes.string.isRequired,
};
export default SuggestedAccounts;
