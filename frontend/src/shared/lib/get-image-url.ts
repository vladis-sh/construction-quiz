export function getImageUrl(path: string | null) {
  if (!path) return null;
  const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
  return `${baseUrl}${path}`;
}
