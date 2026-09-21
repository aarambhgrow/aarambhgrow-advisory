import fs from "node:fs";
import path from "node:path";

/* =========================================================
   SERVICE HERO IMAGES

   Convention: drop `<slug>.png` into /public/images and the
   service hero picks it up — no registry edit needed.
   Services without an image render a full-width text hero.

   Server-only: this reads from disk at build time, so it
   must never be imported from a client component.
========================================================= */

const IMAGE_DIR = path.join(process.cwd(), "public", "images");

/* PNG dimensions live in the IHDR chunk, at a fixed offset. */
function readPngSize(file) {
  const header = Buffer.alloc(24);
  const fd = fs.openSync(file, "r");

  try {
    fs.readSync(fd, header, 0, 24, 0);
  } finally {
    fs.closeSync(fd);
  }

  const isPng = header.readUInt32BE(0) === 0x89504e47;

  if (!isPng) return null;

  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

export function getServiceHeroImage(slug) {
  const file = path.join(IMAGE_DIR, `${slug}.png`);

  if (!fs.existsSync(file)) return null;

  const size = readPngSize(file);

  if (!size) return null;

  return { src: `/images/${slug}.png`, ...size };
}
