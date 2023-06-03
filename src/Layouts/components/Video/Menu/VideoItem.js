import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Menu.module.scss';
// import useElementOnScreen from '~/hook/useElementOnScreen';
import {
  faCommentDots,
  faHeart,
  faMusic,
  faPause,
  faPlay,
  faShare,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function VideoItem({ data, follow }) {
  console.log(data);
  const [isVolume, setIsVolume] = useState(false);
  const [volume, setVolume] = useState(0);
  const [inViewRef, isInView] = useInView({ root: null, rootMargin: '0px', threshold: 0.7 });
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef();
  const selectorRef = useRef();
  const volumeRef = useRef();

  useEffect(() => {
    volumeRef.current.volume = volume;
  }, [volume]);

  const handleClickVolume = () => {
    setIsVolume((prev) => !prev);
  };

  const handleStatusVideo = () => {
    if (isPlaying) {
      videoRef.current.play();
      setIsPlaying(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    volumeRef.current.value = isVolume ? 100 : 0;
    videoRef.current.volume = isVolume ? 1 : 0;
    selectorRef.current.style.width = `${isVolume ? 100 : 0}%`;
  }, [isVolume]);

  const handleAdjustVolume = (value) => {
    let phone = value / 100;
    setVolume(value);
    value > 0 ? setIsVolume(true) : setIsVolume(false);
    selectorRef.current.style.width = `${phone * 100}%`;
    videoRef.current.volume = phone;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (isInView) {
      video.play();
      setIsPlaying((prev) => !prev);
      videoRef.current.currentTime = 0;
    } else {
      if (!isPlaying) {
        video.pause();
        setIsPlaying(true);
        videoRef.current.currentTime = 0;
      }
    }
  }, [isInView]);

  return (
    <div className={cx('container')}>
      <a className={cx('avatar')}>
        <img src={data.user.avatar} />
      </a>
      <div className={cx('content')}>
        <div className={cx('authName')}>
          <a>
            <h4 className={cx('name')}>{data.user.nickname}</h4>
          </a>
          <p className={cx('title')}>{`${data.user.first_name} ${data.user.last_name}`}</p>
        </div>
        <Button outline className={cx('follow')}>
          {follow}
        </Button>
        <div className={cx('titleContainer')}>
          <span className={cx('spanTetxt')}>{data.description}</span>
        </div>
        <h4 className={cx('titleMusic')}>
          <FontAwesomeIcon className={cx('iconMusic')} icon={faMusic} />
          <a href="#">{data.music}</a>
        </h4>

        <div className={cx('videoWrapper')}>
          <div className={cx('divContainer')}>
            <div ref={inViewRef} className={cx('videoContent')}>
              <img className={cx('lazy-src')} src={data.thumb_url} />
              <div className={cx('videoContainer')}>
                <div className={cx('eleVideo')}>
                  <video ref={videoRef} preload="none" loop className={cx('video')}>
                    <source src={data.file_url} type={data.meta.minme_type} />
                    <source src="mov_bbb.ogg" type="video/ogg"></source>
                  </video>
                </div>
              </div>
            </div>
            <div onClick={handleStatusVideo} className={cx('control')}>
              {isPlaying ? (
                <FontAwesomeIcon className={cx('play')} icon={faPlay} />
              ) : (
                <FontAwesomeIcon className={cx('pause')} icon={faPause} />
              )}
            </div>
            <div className={cx('volume')}>
              <div className={cx('columeControl')}>
                <input
                  onChange={(e) => handleAdjustVolume(e.target.value)}
                  ref={volumeRef}
                  className={cx('volumeRange')}
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={volume}
                />
                <div ref={selectorRef} className={cx('selector')}></div>
              </div>
              <div onClick={handleClickVolume} className={cx('volumeBtn')}>
                {isVolume ? (
                  <FontAwesomeIcon className={cx('playVolume')} icon={faVolumeHigh} />
                ) : (
                  <FontAwesomeIcon className={cx('closeVolume')} icon={faVolumeXmark} />
                )}
              </div>
            </div>
          </div>
          <div className={cx('itemContainer')}>
            <button className={cx('interactive')}>
              <span className={cx('spanIcon')}>
                <FontAwesomeIcon className={cx('iconTym')} icon={faHeart} />
              </span>
              <strong>{data.likes_count}</strong>
            </button>
            <button className={cx('interactive')}>
              <span className={cx('spanIcon')}>
                <FontAwesomeIcon className={cx('iconComent')} icon={faCommentDots} />
              </span>
              <strong>1.6M</strong>
            </button>
            <button className={cx('interactive')}>
              <span className={cx('spanIcon')}>
                <FontAwesomeIcon icon={faShare} />
              </span>
              <strong className={cx('iconShare')}>869</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
