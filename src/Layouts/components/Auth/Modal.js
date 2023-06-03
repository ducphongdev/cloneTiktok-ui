import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { useContext } from 'react';
import { ModalBodyNameContext } from '~/Layouts/components/Header';

const cx = classNames.bind(styles);

function Modal({ children, onClose, nextPage }) {
  const modalBody = useContext(ModalBodyNameContext);

  return (
    <div className={cx('modal')}>
      <div className={cx('overlay')}></div>
      <div className={cx('wrapper')}>
        <div className={cx('icon-header')}>
          {nextPage ? (
            <div onClick={() => modalBody.handleModalBody(nextPage)} className={cx('backArrow')}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          ) : (
            ''
          )}
          <div onClick={onClose} className={cx('header')}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
