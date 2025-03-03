"use client";

import { useSearchParams } from "next/navigation";
import { ArtistListItem } from "~/components/artist-list-item";
import { MusicCardItem } from "~/components/music-card-item";
import { MusicListItem } from "~/components/music-list-item";
import { useMusicStore } from "~/store/use-music-store";

export function SearchPage() {
  const searchParams = useSearchParams();
  const { musicList, getArtists } = useMusicStore();

  const query = searchParams.get("query") || "";

  const filteredMusicList = musicList.filter((music) =>
    music.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtistList = getArtists().filter((artist) =>
    artist.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLikedMusic = filteredMusicList.filter((music) => music.liked);

  return (
    <div className="space-y-6 md:space-y-8">
      {query ? (
        <>
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold">Songs</h2>
            </div>
            <ul className="flex flex-col gap-1">
              {filteredMusicList.length > 0 ? (
                filteredMusicList.map((music) => {
                  return (
                    <MusicListItem
                      key={music.id}
                      music={music}
                      musicList={filteredMusicList}
                    />
                  );
                })
              ) : (
                <p>No results found</p>
              )}
            </ul>
          </section>
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold">Artists</h2>
            </div>
            <ul className="flex items-start gap-1 overflow-x-auto">
              {filteredArtistList.length > 0 ? (
                filteredArtistList.map((artist) => {
                  return <ArtistListItem key={artist.name} artist={artist} />;
                })
              ) : (
                <p>No results found</p>
              )}
            </ul>
          </section>
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold">Liked Music</h2>
            </div>
            <ul className="flex items-start gap-1 overflow-x-auto">
              {filteredLikedMusic.length > 0 ? (
                filteredLikedMusic.map((music) => {
                  return (
                    <MusicCardItem
                      key={music.id}
                      music={music}
                      musicList={filteredLikedMusic}
                    />
                  );
                })
              ) : (
                <p>No results found</p>
              )}
            </ul>
          </section>
        </>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold">
              This Week: Most Trending Music
            </h2>
          </div>
          <ol className="flex flex-col gap-1">
            {musicList.slice(0, 10).map((music, index) => {
              return (
                <MusicListItem
                  key={music.id}
                  listNumber={index + 1}
                  music={music}
                  musicList={musicList}
                />
              );
            })}
          </ol>
        </section>
      )}
    </div>
  );
}
