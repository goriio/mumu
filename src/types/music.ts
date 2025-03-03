export type Music = {
  id: number;
  title: string;
  artist: string;
  albumImageUrl: string;
  audioUrl: string;
  liked: boolean;
  playedAt?: number;
};
