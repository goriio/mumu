import { create } from "zustand";
import { persist } from "zustand/middleware";
import { musicList as musicListData } from "~/data/music-list";
import { Artist } from "~/types/artist";
import { Music } from "~/types/music";
import { Playlist } from "~/types/playlist";

export type MusicStore = {
  musicList: Music[];
  playlists: Playlist[];
  getArtists: () => Artist[];
  getArtist: (name: string) => Artist | undefined;
  getArtistsMusic: (name: string) => Music[];
  getRecentlyPlayed: () => Music[];
  getLikedMusic: () => Music[];
  likeMusic: (id: number) => void;
  unlikeMusic: (id: number) => void;
  setPlayedAt: (id: number) => void;
  getPlaylist: (id: number) => Playlist | undefined;
  createPlaylist: (name: string) => void;
  addToPlaylist: (playlistId: number, musicId: number) => void;
  removeFromPlaylist: (playlistId: number, musicId: number) => void;
  getPlaylistMusic: (playlistId: number) => Music[];
};

export const useMusicStore = create<MusicStore>()(
  persist(
    (set, get) => ({
      musicList: musicListData,
      playlists: [],
      getArtists: () => {
        return get().musicList.reduce<Artist[]>((artists, music) => {
          if (artists.find((artist) => artist.name === music.artist))
            return artists;
          return [
            ...artists,
            {
              name: music.artist,
              imageUrl: music.albumImageUrl,
            },
          ];
        }, []);
      },
      getArtist: (name: string) => {
        return get()
          .getArtists()
          .find((artist) => artist.name === name);
      },
      getArtistsMusic: (name: string) => {
        return get().musicList.filter((music) => music.artist === name);
      },
      getRecentlyPlayed: () => {
        return get()
          .musicList.filter((music) => music.playedAt)
          .sort((a, b) => {
            if (!a.playedAt || !b.playedAt) return 0;
            return b.playedAt - a.playedAt;
          });
      },
      getLikedMusic: () => {
        return get().musicList.filter((music) => music.liked);
      },
      likeMusic: (id) =>
        set((state) => ({
          musicList: state.musicList.map((music) => {
            if (music.id === id) {
              return { ...music, liked: true };
            }
            return music;
          }),
        })),
      unlikeMusic: (id) =>
        set((state) => ({
          musicList: state.musicList.map((music) => {
            if (music.id === id) {
              return { ...music, liked: false };
            }
            return music;
          }),
        })),
      setPlayedAt: (id) =>
        set((state) => ({
          musicList: state.musicList.map((music) => {
            if (music.id === id) {
              return { ...music, playedAt: Date.now() };
            }
            return music;
          }),
        })),
      getPlaylist: (id) =>
        get().playlists.find((playlist) => playlist.id === id),
      createPlaylist: (name) =>
        set((state) => ({
          playlists: [
            ...state.playlists,
            {
              id: Date.now(),
              name,
              musicIds: [],
            },
          ],
        })),
      addToPlaylist: (playlistId, musicId) =>
        set((state) => ({
          playlists: state.playlists.map((playlist) => {
            if (playlist.id === playlistId) {
              return {
                ...playlist,
                musicIds: [...playlist.musicIds, musicId],
              };
            }
            return playlist;
          }),
        })),
      removeFromPlaylist: (playlistId, musicId) =>
        set((state) => ({
          playlists: state.playlists.map((playlist) => {
            if (playlist.id === playlistId) {
              return {
                ...playlist,
                musicIds: playlist.musicIds.filter((id) => id !== musicId),
              };
            }
            return playlist;
          }),
        })),
      getPlaylistMusic: (playlistId) => {
        const playlist = get().getPlaylist(playlistId);
        if (!playlist) return [];
        return get().musicList.filter((music) =>
          playlist.musicIds.includes(music.id)
        );
      },
    }),
    {
      name: "music-store",
    }
  )
);
