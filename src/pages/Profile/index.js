import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { ShareProfile, UserProfile } from '~/components/icons';
import Image from '~/components/Image';

function Profile() {
  const cx = classNames.bind(styles);
  const activeRef = useRef();
  const uiRef = useRef();
  const user = useSelector((state) => state?.auth?.currentUser);
  const [tabIndex, setTabIndex] = useState(1);

  const tabs = [
    {
      id: 1,
      tabTitle: 'Video',
      icon: <UserProfile width="10rem" height="10rem" />,
      content: 'Tải video đầu tiên của bạn lên',
    },
    {
      id: 2,
      tabTitle: 'Yêu thích',
      icon: 'Đã thích',
      content: 'Bài đăng yêu thích',
    },
    {
      id: 3,
      tabTitle: 'Đã thích',
      icon: 'Đã thích',
      content: 'Bài đăng đã thích',
    },
  ];
  useEffect(() => {
    function tabContent() {
      console.log(uiRef.current);
    }
    tabContent();
  }, []);
  const handleClickeActive = (index, e) => {
    setTabIndex(index);
    const active = activeRef.current;
    active.style.width = e.target.offsetWidth + 'px';
    active.style.left = e.target.offsetLeft + 'px';
  };
  return (
    <div className={cx('content')}>
      {user === null ? (
        <div className={cx('container')}>
          <div className={cx('layoutHeader')}>
            <div className={cx('divContainer')}></div>
          </div>
        </div>
      ) : (
        <div className={cx('container')}>
          <div className={cx('layoutHeader')}>
            <div className={cx('divContainer')}>
              <Image className={cx('imageUser')} src={user?.avatar} />
              <div className={cx('divName')}>
                <h2>{user.nickname}</h2>
                <h3>{`${user.first_name} ${user.last_name}`}</h3>
                <div className={cx('editContainer')}>
                  <button>
                    <FontAwesomeIcon className={cx('editProfile')} icon={faPenToSquare} />
                    <span>Edit profile</span>
                  </button>
                </div>
              </div>
            </div>
            <h3 className={cx('countInfo')}>
              <div className={cx('status')}>
                <strong>5</strong>
                <span>Đang Follow</span>
              </div>
              <div className={cx('status')}>
                <strong>20</strong>
                <span>Follower</span>
              </div>
              <div className={cx('status')}>
                <strong>30</strong>
                <span>Thích</span>
              </div>
            </h3>
            <h2 className={cx('story')}>{user.bio}</h2>
            <div className={cx('icon-tem')}>
              <div className={cx('iconShare')}>
                <ShareProfile />
              </div>
              <div>
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </div>
          </div>
          <div className={cx('contentMain')}>
            <div className={cx('navbar')}>
              {tabs.map((tab, index) => (
                <div ref={uiRef} onClick={(e) => handleClickeActive(tab.id, e)} className={cx('navItem')} key={index}>
                  <>{tab.tabTitle}</>
                </div>
              ))}
              <div className={cx('activeBar')} ref={activeRef}></div>
            </div>
            <div className={cx('mainDetails')}>
              <div className={cx('errorContainer')}>
                {tabs.map((tab, index) => (
                  <div key={index}>
                    {tabIndex === tab.id && (
                      <>
                        <p>{tab.icon}</p>
                        <p className={cx('titleHed')}>{tab.content}</p>
                      </>
                    )}
                  </div>
                ))}

                <p className={cx('subtitles')}>Video của bạn sẽ xuất hiện tại đây</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
