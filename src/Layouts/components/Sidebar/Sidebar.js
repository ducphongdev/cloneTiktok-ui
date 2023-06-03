import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import FollowAccounts from '~/components/SuggestedAccounts/FollowAccounts';
import config from '~/config';
import * as userService from '~/services/userService';
import {
  HomeIcon,
  HomeActiveIcon,
  UserGroupIcon,
  UserGroupActiveIcon,
  LiveIcon,
  LiveActiveIcon,
} from '~/components/icons';
import { useSelector } from 'react-redux';

let INIT_PAGE = 5;

const cx = classNames.bind(styles);
function Sidebar() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  // const [followingAccounts, setFollowingAccounts] = useState([]);
  const [perPages, setPerPage] = useState(INIT_PAGE);
  const [followAccounts, setFollowingAccounts] = useState([]);

  const isLogin = useSelector((state) => state.auth.isLogin);

  const handleSeeAll = () => {
    if (suggestedUsers.length === INIT_PAGE) {
      setPerPage(INIT_PAGE * 4);
    } else {
      setPerPage(INIT_PAGE);
    }
  };

  useEffect(() => {
    const getSuggestedAccounts = async () => {
      try {
        const res = await userService.forYou({ page: 1, perPage: perPages });

        if (Array.isArray(res)) {
          setSuggestedUsers(res);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSuggestedAccounts();

    // Follow Account
    if (isLogin) {
      const getFollowingAccounts = async () => {
        try {
          const res = await userService.followMe({ page: 1 });
          if (Array.isArray(res)) {
            setFollowingAccounts(res);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getFollowingAccounts();
    }
  }, [perPages, isLogin]);
  return (
    <aside className={cx('wrapper')}>
      <div className={cx('container')}>
        <Menu>
          <MenuItem
            to={config.router.home}
            icon={<HomeIcon />}
            activeIcon={<HomeActiveIcon />}
            title={'Dành cho bạn'}
          />
          <MenuItem
            to={config.router.following}
            icon={<UserGroupIcon />}
            activeIcon={<UserGroupActiveIcon />}
            title={'Đang Follow'}
          />
          <MenuItem to={config.router.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} title={'LIVE'} />
          <SuggestedAccounts
            lable="Suggested accounts"
            data={suggestedUsers}
            onSeeAll={handleSeeAll}
            isSeeAll={suggestedUsers.length === INIT_PAGE ? 'SeeAll' : 'SeeLest'}
          />
          <FollowAccounts
            lable="Following accounts"
            data={followAccounts}
            isSeeAll={followAccounts.length === INIT_PAGE ? 'SeeAll' : 'SeeLest'}
          />
        </Menu>
      </div>
    </aside>
  );
}

export default Sidebar;
