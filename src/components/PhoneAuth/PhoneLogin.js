import classNames from 'classnames/bind';
import styles from '~/Layouts/components/Auth/partials/Login.module.scss';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useRef, useState } from 'react';
import { ModalBodyNameContext } from '../../Layouts/components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailed } from '~/redux/authSlice';
import useLocaStorage from '~/hook/useLocaStorage';

const cx = classNames.bind(styles);

function PhoneLogin() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const messageLogin = useSelector((state) => state.auth.message);
  const isLoginError = useSelector((state) => state.auth.error);

  const { setDataLocaStorage, getDataLocaStorage } = useLocaStorage();

  const modalBody = useContext(ModalBodyNameContext);

  const navigate = useNavigate();
  const userRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  useEffect(() => {
    let timeId;
    if (!isLoginError && isLogin) {
      timeId = setTimeout(() => {
        window.location.reload();
      });
    }
    return () => clearTimeout(timeId);
  }, [isLoginError, isLogin]);

  // Xử lý login
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'https://tiktok.fullstack.edu.vn/api/auth/login',

        {
          email: user,
          password: pwd,
        },
      )
      .then((response) => {
        const accessToken = response?.data?.meta?.token;
        const user = response?.data?.data;
        if (accessToken && user) {
          setDataLocaStorage('accessToken', accessToken);
          setDataLocaStorage('user', user);
          dispatch(loginSuccess(user));
        }
      })
      .catch((err) => {
        if (!err?.response) {
          dispatch(loginFailed('Không có phản hồi của máy chủ'));
        } else if (err.response?.status === 400) {
          dispatch(loginFailed('Thiếu tên người dùng hoặc mật khẩu'));
        } else if (err.response?.status === 401) {
          dispatch(loginFailed('Không được phép'));
        } else {
          dispatch(loginFailed('Đăng nhập thất bại'));
        }
      });
  };
  return (
    <>
      <div className={cx('containes')}>
        <div className={cx('form')}>
          <h4 className={cx('title')}>Log in</h4>
          <div className={cx('description')}>
            Phone
            <a className={cx('styledLink')}>Login in with email or username</a>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={cx('container')}>
              <div className={cx('input')}>
                <div className={cx('inputHed')}>
                  <span className={cx('spanLabel')}>
                    VN +84
                    <div className={cx('icon-down')}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  </span>
                </div>
                <div className={cx('input_number')}>
                  <input
                    className={cx('inputContainer')}
                    type="text"
                    ref={userRef}
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div className={cx('input')}>
                <div className={cx('input_number')}>
                  <input
                    className={cx('inputContainer')}
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    type="password"
                    placeholder="Phone number"
                  />
                </div>
                <span className={cx('send_Code')}>Send code</span>
              </div>
              <a href="" className={cx('text')}>
                Log In with password
              </a>
              <button className={cx('submit')}>Log in</button>
            </div>
          </form>
        </div>
      </div>

      <div className={cx('fotter')}>
        <h3 className={cx('fotterTitle')}>Already have an account</h3>
        <a className={cx('singnUp')} onClick={() => modalBody.handleModalBody('signUp')}>
          Sign Up
        </a>
      </div>
    </>
  );
}

export default PhoneLogin;
