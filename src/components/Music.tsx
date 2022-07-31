import styled from 'styled-components';
import { IMusic } from '../types';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Modal } from './Modal';
import { useState } from 'react';

const StyledMusic = styled.div`
  position: relative;
  max-width: 900px;
  float: right;
`;

const MusicContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--color-fg);
  border-radius: var(--border-radius);
  transition: var(--speed) ease;
  cursor: pointer;

  &:hover {
    opacity: 80%;
  }
`;

const MusicCover = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
  border-radius: var(--border-radius-large);
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 60vw;
  margin-right: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (min-width: 768px) {
    width: 40vw;
  }
`;

const MusicTitle = styled.h3`
  margin-bottom: -0.5rem;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Menu = styled(BiDotsVerticalRounded)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.75rem;
  border-radius: 50%;
  padding: 2px;

  &:hover,
  &:active {
    background: var(--color-fg);
  }
`;

interface MusicProps {
  music: IMusic;
  musicList: IMusic[];
  handleMusicItemClick: (id: number, music: IMusic[]) => void;
}

function Music({ music, musicList, handleMusicItemClick }: MusicProps) {
  const [modalOpen, setModalOpen] = useState(false);

  function handleMenuClick() {
    setModalOpen(true);
  }

  return (
    <StyledMusic>
      <MusicContainer onClick={() => handleMusicItemClick(music.id, musicList)}>
        <MusicCover src={music.url.image} />
        <DescriptionWrapper>
          <MusicTitle>{music.title}</MusicTitle>
          <Artist>{music.artist}</Artist>
        </DescriptionWrapper>
      </MusicContainer>
      <Menu onClick={handleMenuClick} />
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
        Working on this one.
      </Modal>
    </StyledMusic>
  );
}

const StyledMusicList = styled.div`
  display: grid;
  grid-column: 1fr;
  gap: 0.5rem;
  margin-bottom: 20vh;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.25rem;
`;

interface MusicListProps {
  title?: string;
  musicList: IMusic[];
  handleMusicItemClick: (id: number, music: IMusic[]) => void;
}

export function MusicList({ title, musicList, handleMusicItemClick }: MusicListProps) {
  return (
    <StyledMusicList>
      {title && <Title>{title}</Title>}
      {musicList.length ? (
        musicList.map((music) => {
          return (
            <Music
              key={music.id}
              music={music}
              musicList={musicList}
              handleMusicItemClick={handleMusicItemClick}
            />
          );
        })
      ) : (
        <p>There is nothing here. Try adding music.</p>
      )}
    </StyledMusicList>
  );
}
