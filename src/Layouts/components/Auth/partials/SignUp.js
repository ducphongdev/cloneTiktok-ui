import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Facebook, Google } from '~/components/icons';
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { ModalBodyNameContext } from '../../Header';

const cx = classNames.bind(styles);

const modal = [
  {
    title: 'Use phone / email / username',
    icon: <FontAwesomeIcon icon={faUser} />,
    href: 'signUpPhone',
  },
  {
    title: 'Countinue with Facebook',
    icon: <Facebook width="2rem" height="2rem" />,
  },
  {
    title: 'Countinue with Google',
    icon: <Google width="2rem" height="2rem" />,
  },
];

function SignUp() {
  const modalBody = useContext(ModalBodyNameContext);

  const renderButtons = () => {
    return modal.map((boutton, key) => {
      return (
        <div key={key} className={cx('wraper')} onClick={() => boutton.href && modalBody.handleModalBody(boutton.href)}>
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
          <h4 className={cx('title')}>Sign up for TikTok</h4>
          {renderButtons()}
          <div className={cx('iconDown')}>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </div>
      <div className={cx('formtown')}>
        <p className={cx('contin')}>
          By continuing, you agree to TikTok’s Terms of Service and confirm that you have read TikTok’s Privacy Policy.
        </p>
      </div>
      <div className={cx('fotter')}>
        <h3 className={cx('fotterTitle')}>Already have an account</h3>
        <a className={cx('singnUp')} onClick={() => modalBody.handleModalBody('login')}>
          Login in
        </a>
      </div>
    </>
  );
}

export default SignUp;
