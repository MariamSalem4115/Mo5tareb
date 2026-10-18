import { useState } from "react";
import { ImageIcon } from "lucide-react";

// Shows the photo; if the file is missing, shows a soft purple placeholder.
export default function Photo({ src, alt = "", className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} className={`grid place-items-center bg-linear-to-br from-brand-soft to-slate-200 text-brand/40 ${className}`}>
        <ImageIcon size={40} />
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}
