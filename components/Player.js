import React, { useState, useRef, useEffect } from 'react';
import { Inter } from '@next/font/google';

import styles from '../styles/AudioPlayer.module.css';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';

const playerFont = Inter({ weight: '300', subsets: ['latin'] });

const AudioPlayer = ({
  trackId,
  name,
  pathName,
  svgPath,
  trackPlaying,
  updateTrack,
  type,
  staticDuration,
}) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
      updateTrack(trackId);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
      updateTrack(0);
    }
  };

  useEffect(() => {
    if (trackPlaying !== trackId && trackId !== 0) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
      setIsPlaying(false);
    }
  }, [trackPlaying, trackId]);

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  return (
    <div className={styles.audioPlayer}>
      <span className={styles.title}>{name}</span>
      <audio ref={audioPlayer} preload="auto">
        <source src={pathName} type={type} />
      </audio>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
      </button>
      <div className={styles.timeAndProgress}>
        {/* current time */}
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        {/* progress bar */}
        <div className={styles.progressContainer}>
          <input
            type="range"
            className={styles.progressBar}
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
            style={{
              maskImage: `url(${svgPath})`,
              WebkitMaskImage: `url(${svgPath})`,
            }}
          />
        </div>

        {/* duration */}
        <div className={styles.duration}>
          {/* {duration && !isNaN(duration) && calculateTime(duration)} */}
          {staticDuration}
        </div>
      </div>
    </div>
  );
};

export { AudioPlayer };
