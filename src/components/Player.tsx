import styled from 'styled-components';
import { IMusic } from '../types';
import { BiPlay, BiPause, BiSkipNext } from 'react-icons/bi';
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';

const StyledPlayer = styled.div`
  position: fixed;
  bottom: var(--nav-height);
  display: flex;
  align-items: center;
  padding: 0.5rem;
  padding-bottom: calc(0.5rem + var(--progress-bar-height));
  width: 100%;
  background: var(--color-bg);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;

  @media screen and (min-width: 768px) {
    bottom: 1rem;
    width: 700px;
    left: 50%;
    border-radius: var(--border-radius);
    transform: translateX(-50%);
  }
`;

const MusicCover = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  border-radius: var(--border-radius-large);
`;

const Title = styled.p`
  font-size: 1.1rem;
  font-weight: 700;
  flex: 1 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
`;

const Progress = styled.progress`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: var(--progress-bar-height);
  border: none;
  background: var(--color-fg);

  &::-moz-progress-bar,
  &::-webkit-progress-value {
    background: var(--color-primary);
  }
`;

interface PlayerProps {
  current: IMusic | null;
  setCurrent: Dispatch<SetStateAction<IMusic | null>>;
  musicList: IMusic[] | null;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: RefObject<HTMLAudioElement>;
}

export function Player({
  current,
  setCurrent,
  musicList,
  isPlaying,
  setIsPlaying,
  audioRef,
}: PlayerProps) {
  const progressRef = useRef<HTMLProgressElement>(null);

  function handleProgressUpdate() {
    if (progressRef.current && audioRef.current) {
      progressRef.current.value = audioRef.current.currentTime / audioRef.current.duration;
    }
  }

  useEffect(() => {
    audioRef.current?.addEventListener('timeupdate', handleProgressUpdate);
    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleProgressUpdate);
    };
  }, []);

  function handleNext() {
    const index = musicList?.findIndex((music) => music.id === current?.id) as number;

    if (musicList && musicList.length - 1 === index) {
      setCurrent(musicList?.at(0) as IMusic);
    } else {
      setCurrent(musicList?.at(index + 1) as IMusic);
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  return (
    <>
      {current && (
        <StyledPlayer>
          <MusicCover src={current.url.image} />
          <Title>{current.title}</Title>
          <Control>
            {isPlaying ? (
              <BiPause onClick={() => setIsPlaying(false)} />
            ) : (
              <BiPlay onClick={() => setIsPlaying(true)} />
            )}
            <BiSkipNext onClick={handleNext} />
          </Control>
          <Progress ref={progressRef} value='0' max='1' />
        </StyledPlayer>
      )}
    </>
  );
}
