import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import styles from '~/Layouts/components/Auth/partials/Login.module.scss';
import { ModalBodyNameContext } from '~/Layouts/components/Header';
import * as registerService from '~/services/registerService';

const cx = classNames.bind(styles);
function SignUpPhone() {
  const modalBody = useContext(ModalBodyNameContext);
  const [user, setUser] = useState();
  const [pwd, setPwd] = useState();
  const handleSubmitRegister = (e) => {
    e.preventDefault();

    const registerApi = async () => {
      try {
        const res = await registerService.register({ user, pwd });
        if (res.response.data.status_code === 422) {
          throw res.response.data.errors;
        }
      } catch (err) {
        if (!err.response) {
          console.log('No serve response');
        } else if (err.response?.status === 409) {
          console.log('user name taken');
        } else {
          console.log('Registration Failed');
        }
      }
    };
    registerApi();
  };

  return (
    <>
      <div className={cx('containes')}>
        <div className={cx('form')}>
          <h4 className={cx('title')}>Đăng ký</h4>
          <div className={cx('description')}>
            Phone
            <a className={cx('styledLink')}>Login in with email or username</a>
          </div>
          <form onSubmit={handleSubmitRegister}>
            <div className={cx('container')}>
              <div className={cx('input')}>
                <div className={cx('input_number')}>
                  <input
                    className={cx('inputContainer')}
                    onChange={(e) => setUser(e.target.value)}
                    type="text"
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div className={cx('input')}>
                <div className={cx('input_number')}>
                  <input
                    className={cx('inputContainer')}
                    onChange={(e) => setPwd(e.target.value)}
                    type="password"
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <a href="" className={cx('text')}>
                Forgot password
              </a>
              <button className={cx('submit')}>Register</button>
            </div>
          </form>
        </div>
      </div>

      <div className={cx('fotter')}>
        <h3 className={cx('fotterTitle')}>Already have an account</h3>
        <a className={cx('singnUp')} onClick={() => modalBody.handleModalBody('login')}>
          Login
        </a>
      </div>
    </>
  );
}

export default SignUpPhone;
