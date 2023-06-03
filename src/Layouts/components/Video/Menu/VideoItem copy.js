import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Menu.module.scss';
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
import useElementOnScreen from '~/hook/useElementOnScreen';
const cx = classNames.bind(styles);

function VideoItem({ data, follow }) {
  const videoRef = useRef();
  const playRef = useRef();
  const inputRef = useRef();
  const timeStart = useRef();
  const [playing, setPlaying] = useState(null);
  const video = videoRef.current;
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);

  // const handleScroll = () => {
  //   const playerElement = videoRef.current;
  //   if (playerElement) {
  //     const { top, bottom } = playerElement.getBoundingClientRect();
  //     if (top >= 0 && bottom <= window.innerHeight) {
  //       setPlaying(true);
  //     } else {
  //       setPlaying(false);
  //     }
  //   }
  // };

  const onVideoClick = () => {
    if (playing) {
      video.pause();
      setPlaying((prev) => !prev);
    } else {
      video.play();
      setPlaying((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleAutoPlay = (e) => {
      video.play();
    };

    if (isVisibile) {
      video.play();
      setPlaying((prev) => !prev);
      video.addEventListener('ended', handleAutoPlay);
    } else {
      if (playing) {
        video.pause();
        setPlaying((prev) => !prev);
        video.currentTime = 0;
      }
    }
    return () => {
      videoRef.current.removeEventListener('ended', handleAutoPlay);
    };
  }, [isVisibile]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const playerElement = videoRef.current;
  //     if (playerElement) {
  //       const { top, bottom } = playerElement.getBoundingClientRect();
  //       const windowHeight = window.innerHeight;

  //       if (top >= 0 && bottom <= windowHeight) {
  //         setPlaying(true);
  //         playerElement.play();
  //       } else {
  //         setPlaying(false);
  //         playerElement.pause();
  //         playerElement.currentTime = 0;
  //       }
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const hanldeTimeUpdate = () => {
    // % input
    const progressPercent = Math.floor((video.currentTime / video.duration) * 100);
    const time = Math.floor(video.currentTime) % 60;
    const timeMinute = Math.floor(video.currentTime / 60);

    if (!Number.isNaN(progressPercent) && !Number.isNaN(time)) {
      inputRef.current.value = progressPercent;
      if (time < 10) {
        var a = 0;
      } else {
        var a = '';
      }
      timeStart.current.textContent = timeMinute + ':' + a + time;
    }
  };

  const handleNext = (e) => {
    const seekTime = (video.duration * e.target.value) / 100;
    video.currentTime = seekTime;
  };

  const handleStartVolume = () => {};
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
            <div className={cx('videoContent')}>
              <img className={cx('lazy-src')} src={data.thumb_url} />
              <div className={cx('videoContainer')}>
                <div className={cx('eleVideo')}>
                  <video
                    ref={videoRef}
                    preload="none"
                    onTimeUpdate={hanldeTimeUpdate}
                    muted
                    onClick={onVideoClick}
                    className={cx('video')}
                  >
                    <source src={data.file_url} type={data.meta.minme_type} />
                    <source src="mov_bbb.ogg" type="video/ogg"></source>
                  </video>
                </div>
              </div>
            </div>
            <div ref={playRef} onClick={onVideoClick} className={cx('loading', { playing: playing })}>
              <FontAwesomeIcon className={cx('pause')} icon={faPlay} />
              <FontAwesomeIcon className={cx('play')} icon={faPause} />
            </div>
            <div className={cx('bar')}>
              <div className={cx('line')}>
                <input ref={inputRef} onChange={handleNext} type="range" step="1" min="0" max="100" />
              </div>
              <div className={cx('time')}>
                <span ref={timeStart} className={cx('playTime')}>
                  0:00
                </span>
                /<span className={cx('timeVideo')}>{data.meta.playtime_string}</span>
              </div>
            </div>
            <div className={cx('volume')}>
              <div className={cx('columeControl')}>
                <div className={cx('barVolume')}>
                  <div className={cx('volumeBar')}>
                    {/* <div className={cx('straightLine')}></div> */}
                    <div className={cx('picture')}></div>
                    {/* <div className={cx('colorLine')}></div> */}
                  </div>
                </div>
                <input className={cx('volumeRange')} type="range" min="0" max="100" step="1" />
              </div>
              <div onClick={handleStartVolume} className={cx('volumeBtn')}>
                <FontAwesomeIcon className={cx('playVolume')} icon={faVolumeHigh} />
                <FontAwesomeIcon className={cx('closeVolume')} icon={faVolumeXmark} />
              </div>
            </div>
          </div>
          <div className={cx('itemContainer')}>
            <button className={cx('interactive')}>
              <span className={cx('spanIcon')}>
                <FontAwesomeIcon className={cx('iconTym')} icon={faHeart} />
              </span>
              <strong>1.6M</strong>
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
