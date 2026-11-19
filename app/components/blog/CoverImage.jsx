import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

/*
  Post cover. Shows the image when it exists in /public, otherwise a branded
  placeholder, so a post can go live before its image is ready.
*/
const hasFile = (src) => Boolean(src) && fs.existsSync(path.join(process.cwd(), "public", src));

export default function CoverImage({ src, alt, label, sizes = "100vw", priority = false, className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-[#03254C] ${className}`}>
      {hasFile(src) ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(242,101,34,0.45),transparent_55%),radial-gradient(circle_at_10%_90%,rgba(21,115,39,0.35),transparent_50%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
          {label && (
            <span className="absolute bottom-5 left-5 text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
