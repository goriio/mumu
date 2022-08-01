import { useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from '../components/Container';
import { MusicList } from '../components/Music';
import { NavBar } from '../components/NavBar';
import { Player } from '../components/Player';
import { SearchBar } from '../components/SearchBar';
import { musicList } from '../data/music';
import { IMusic } from '../types';

export function AppRoutes() {
  const [currentMusicList, setCurrentMusicList] = useState<IMusic[] | null>(null);
  const [current, setCurrent] = useState<IMusic | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState('');
  const [playlist, setPlaylist] = useState(
    JSON.parse(localStorage.getItem('playlist') || '[]') as IMusic[],
  );

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
  }, [playlist]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  function handleMusicItemClick(id: number, music: IMusic[]) {
    setCurrentMusicList(music);
    setCurrent(music.find((item) => item.id === id) as IMusic);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }

  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route
            path='/'
            element={
              <MusicList
                title='All Music'
                musicList={musicList}
                handleMusicItemClick={handleMusicItemClick}
                playlist={playlist}
                setPlaylist={setPlaylist}
              />
            }
          />
          <Route
            path='/search'
            element={
              <>
                <SearchBar search={search} setSearch={setSearch} />
                <MusicList
                  title='Search results'
                  musicList={musicList.filter(
                    (music) =>
                      music.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
                      music.artist.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
                  )}
                  handleMusicItemClick={handleMusicItemClick}
                  playlist={playlist}
                  setPlaylist={setPlaylist}
                />
              </>
            }
          />
          <Route
            path='/playlist'
            element={
              <MusicList
                title='Playlist'
                musicList={playlist}
                handleMusicItemClick={handleMusicItemClick}
                playlist={playlist}
                setPlaylist={setPlaylist}
              />
            }
          />
          <Route path='/settings' element={<p>Still working on settings feature.</p>} />
          <Route path='*' element={<p>404</p>} />
        </Routes>
      </Container>
      <Player
        current={current}
        setCurrent={setCurrent}
        musicList={currentMusicList}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />
      <audio
        ref={audioRef}
        src={current?.url.audio}
        onCanPlay={() => {
          setIsPlaying(true);
        }}
      />
    </>
  );
}
