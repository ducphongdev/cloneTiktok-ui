import { useContext } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Login.module.scss';
import { Facebook, Google, Line, Twitter, KakaoTalk, Apple, Instagram } from '~/components/icons';
import { ModalBodyNameContext } from '~/Layouts/components/Header';

const modal = [
  {
    title: 'Use QR code',
    icon: <FontAwesomeIcon icon={faQrcode} />,
  },
  {
    href: 'phoneLogin',
    title: 'Use phone / email / username',
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    title: 'Countinue with Facebook',
    icon: <Facebook width="2rem" height="2rem" />,
  },
  {
    title: 'Countinue with Google',
    icon: <Google width="2rem" height="2rem" />,
  },
  {
    title: 'Countinue with Line',
    icon: <Line width="2rem" height="2rem" />,
  },
  {
    title: 'Countinue with Twitter',
    icon: <Twitter width="2rem" height="2rem" />,
  },
  {
    title: 'Countinue with KakaoTalk',
    icon: <KakaoTalk width="2rem" height="2rem" />,
  },
  {
    title: 'Countinue with Apple',
    icon: <Apple width="2rem" height="2rem" />,
  },
  {
    title: 'Countinue with Instagram',
    icon: <Instagram width="2rem" height="2rem" />,
  },
];
const cx = classNames.bind(styles);

function Login() {
  const modalBody = useContext(ModalBodyNameContext);

  const renderButtons = () => {
    return modal.map((boutton, key) => {
      return boutton.href ? (
        <a key={key} onClick={() => modalBody.handleModalBody(boutton.href)}>
          <div className={cx('wraper')}>
            <div className={cx('icon')}>{boutton.icon}</div>
            <p className={cx('titleBtn')}>{boutton.title}</p>
          </div>
        </a>
      ) : (
        <div key={key} className={cx('wraper')}>
          <div className={cx('icon')}>{boutton.icon}</div>
          <p className={cx('titleBtn')}>{boutton.title}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className={cx('containes')}>
        <div className={cx('form')}>
          <h4 className={cx('title')}>Log in to TikTok</h4>
          {renderButtons()}
        </div>
      </div>
      <div className={cx('fotter')}>
        <h3 className={cx('fotterTitle')}>Don't have an account?</h3>
        <a className={cx('singnUp')} onClick={() => modalBody.handleModalBody('signUp')}>
          Sign Up
        </a>
      </div>
    </>
  );
}

export default Login;
