export interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: string;
  /**
   * Emit `f_auto` and `dpr_auto` so Cloudinary negotiates modern formats.
   * Disable where the declared content type must stay stable (og:image, RSS enclosures).
   */
  autoFormat?: boolean;
}

const CLOUDINARY_HOST = "res.cloudinary.com";
const UPLOAD_SEGMENT = "/image/upload/";
const TRANSFORM_SEGMENT = /(^|,)(f_auto|q_auto|dpr_auto|w_|h_|c_)/;

/**
 * Insert Cloudinary delivery transforms into a remote image URL.
 * Only URLs whose host is exactly `res.cloudinary.com` are transformed.
 * Anything else, and already-transformed URLs, pass through unchanged.
 */
export function cloudinaryUrl(url: string | undefined | null, options: CloudinaryOptions = {}): string {
  if (!url) return "";

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  if (parsed.hostname !== CLOUDINARY_HOST) return url;

  const markerIndex = parsed.pathname.indexOf(UPLOAD_SEGMENT);
  if (markerIndex === -1) return url;

  const rest = parsed.pathname.slice(markerIndex + UPLOAD_SEGMENT.length);
  const separatorIndex = rest.indexOf("/");
  const firstSegment = separatorIndex === -1 ? rest : rest.slice(0, separatorIndex);

  // Already transformed (ours or a hand-written URL): leave it alone.
  if (TRANSFORM_SEGMENT.test(firstSegment)) return url;

  const { width, height, crop, autoFormat = true } = options;
  const transforms: string[] = [];
  if (autoFormat) transforms.push("f_auto");
  transforms.push("q_auto");
  if (autoFormat) transforms.push("dpr_auto");
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);

  const pathname =
    parsed.pathname.slice(0, markerIndex + UPLOAD_SEGMENT.length) + transforms.join(",") + "/" + rest;

  return parsed.origin + pathname + parsed.search + parsed.hash;
}
