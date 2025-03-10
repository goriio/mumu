import { HeartFill } from "../icons/heart-fill";
import { HeartLine } from "../icons/heart-line";

export type LikeButtonProps = {
  liked: boolean;
  onLike: (event: React.MouseEvent) => void;
  onUnlike: (event: React.MouseEvent) => void;
};

export function LikeButton({ liked, onLike, onUnlike }: LikeButtonProps) {
  return (
    <button onClick={liked ? onUnlike : onLike}>
      {liked ? (
        <HeartFill className="text-lg text-red-500" />
      ) : (
        <HeartLine className="text-lg text-slate-400 transition ease-in-out hover:text-red-500" />
      )}
    </button>
  );
}
