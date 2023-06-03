import classNames from 'classnames/bind';
import styles from './Video.module.scss';

import { useEffect, useState } from 'react';
import * as videoService from '~/services/videoService';
import Menu, { VideoItem } from './Menu';

const cx = classNames.bind(styles);

function Video() {
  const [listVideo, setListVideo] = useState([]);
  const [page, setPage] = useState(() => {
    let page = Math.floor(Math.random() * 10);
    return page;
  });
  const videosPerPage = 5;

  const fetchVideos = async (currentPage) => {
    try {
      const res = await videoService.video({ page: currentPage });
      if (Array.isArray(res)) {
        setListVideo((prevList) => [...prevList, ...res]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage((prevPage) => ++prevPage);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  const visibleVideos = listVideo.slice(0, page * videosPerPage); // Giới hạn 5 video

  return (
    <div className={cx('wrapper')}>
      <Menu>
        {visibleVideos.map((item, index) => {
          return <VideoItem key={index} data={item} follow="FOLLOW" />;
        })}
        {listVideo.length && <div className={cx('loader')}></div>}
      </Menu>
    </div>
  );
}

export default Video;
