/** Convert YouTube watch/short URLs to embed URL for iframe */
export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return "";
  try {
    let videoId = "";
    const watchMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
    );
    if (watchMatch) videoId = watchMatch[1];
    const shortMatch = url.match(/youtu\.be\/([^&\n?#]+)/);
    if (shortMatch) videoId = shortMatch[1];
    const embedMatch = url.match(/youtube\.com\/embed\/([^&\n?#]+)/);
    if (embedMatch) videoId = embedMatch[1];
    if (videoId) {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1${
        origin ? `&origin=${encodeURIComponent(origin)}` : ""
      }`;
    }
    return "";
  } catch {
    return "";
  }
}

export function isValidYouTubeUrl(url: string): boolean {
  if (!url) return false;
  const patterns = [
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+/,
    /^(https?:\/\/)?(www\.)?youtu\.be\/[a-zA-Z0-9_-]+/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+/,
  ];
  return patterns.some((p) => p.test(url));
}
