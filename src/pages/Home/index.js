import Video from '~/Layouts/components/Video';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

function Home() {
  const cx = classNames.bind(styles);
  return (
    <div className={cx('center')}>
      <Video />
    </div>
  );
}

export default Home;
