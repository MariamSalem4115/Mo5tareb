// Round profile picture; shows the first letter of the name when there is no photo.
export default function Avatar({ src, name = "", className = "size-9 text-sm" }) {
  return src ? (
    <img src={src} alt="" className={`${className} shrink-0 rounded-full object-cover`} />
  ) : (
    <span className={`${className} grid shrink-0 place-items-center rounded-full bg-brand-soft font-bold text-brand`}>{name[0]}</span>
  );
}
