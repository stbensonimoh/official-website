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

/**
 * Insert Cloudinary delivery transforms into a remote image URL.
 * Non-Cloudinary URLs and empty values are returned unchanged, so callers can
 * pass raw frontmatter values without special-casing.
 */
export function cloudinaryUrl(url: string | undefined | null, options: CloudinaryOptions = {}): string {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com/") || !url.includes("/image/upload/")) return url;
  // Already transformed (ours or a hand-written URL): leave it alone.
  if (/\/upload\/([^/]*(f_auto|q_auto|dpr_auto|w_(?:\d+(?:\.\d+)?|auto)|h_(?:\d+(?:\.\d+)?|auto)|c_)[^/]*)\//.test(url)) return url;

  const { width, height, crop, autoFormat = true } = options;
  const transforms: string[] = [];
  if (autoFormat) transforms.push("f_auto");
  transforms.push("q_auto");
  if (autoFormat) transforms.push("dpr_auto");
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);

  return url.replace("/image/upload/", `/image/upload/${transforms.join(",")}/`);
}
