const WORDS_PER_MINUTE = 200;

export function getReadingTime(content: string): {
  text: string;
  minutes: number;
} {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);
  return {
    text: `${minutes} min read`,
    minutes,
  };
}

export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
