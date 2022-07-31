import styled from 'styled-components';
import { IMusic } from '../types';
import { BiPlay, BiPause, BiSkipNext } from 'react-icons/bi';
import { Dispatch, RefObject, SetStateAction } from 'react';

const StyledPlayer = styled.div`
  position: fixed;
  bottom: var(--nav-height);
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  background: var(--color-bg);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  box-shadow: var(--box-shadow);

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
        </StyledPlayer>
      )}
    </>
  );
}
