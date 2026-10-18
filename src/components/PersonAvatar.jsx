import Avatar from "./Avatar";
import Photo from "./Photo";

// A person's round picture. Uses the photo when there is one (with a soft placeholder if the file is missing),
// otherwise the first letter of the name.
export default function PersonAvatar({ src, name, className = "size-16 text-xl" }) {
  if (!src) return <Avatar name={name} className={className} />;
  return <Photo src={src} alt={name} className={`${className} shrink-0 rounded-full`} />;
}
