import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function AccountPreview({ data }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <img className={cx('avatar')} src={data.avatar} />
        <Button className={cx('preview-btn')} small primary>
          Follow
        </Button>
      </div>
      <div className={cx('body')}>
        <div className={cx('nickname')}>
          <h4>{data.nickname}</h4>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </div>
        <p className={cx('name')}>{`${data.first_name + ' ' + data.last_name} `}</p>
        <p className={cx('analytics')}>
          <span className={cx('value')}>{data.followers_count}M</span>
          <span className={cx('label')}>Follower</span>
          <span className={cx('value')}>{data.likes_count}M</span>
          <span className={cx('label')}>Thich</span>
        </p>
      </div>
    </div>
  );
}

export default AccountPreview;
