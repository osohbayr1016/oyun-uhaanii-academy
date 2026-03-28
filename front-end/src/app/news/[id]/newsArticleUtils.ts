export function formatNewsDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getYouTubeEmbedUrl(videoUrl: string): string {
  if (!videoUrl) return "";
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
  ];
  const match = videoUrl.match(patterns[0]);
  if (match?.[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return videoUrl;
}
