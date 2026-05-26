import { apiRequest } from "./queryClient";

export interface YouTubeVideo {
  id: number;
  videoId: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  category: string;
  duration: string;
  publishedAt: string;
}

export async function getLatestShowreel(): Promise<{ videoId: string }> {
  const res = await apiRequest("GET", "/api/videos/showreel", undefined);
  return res.json();
}

export async function getFeaturedVideos(): Promise<YouTubeVideo[]> {
  const res = await apiRequest("GET", "/api/videos/featured", undefined);
  return res.json();
}

export async function getAllVideos(): Promise<YouTubeVideo[]> {
  const res = await apiRequest("GET", "/api/videos/all", undefined);
  return res.json();
}

export async function getVideosByCategory(category: string): Promise<YouTubeVideo[]> {
  const res = await apiRequest("GET", `/api/videos/category/${category}`, undefined);
  return res.json();
}

export async function getLongestVideo(): Promise<YouTubeVideo> {
  const res = await apiRequest("GET", "/api/videos/longest", undefined);
  return res.json();
}
