import { Video, GalleryData } from '@/lib/types';

// Fetch videos from JSON file
export async function fetchVideos(): Promise<Video[]> {
    try {
        const response = await fetch('/data/gallery.json', {
            cache: 'no-store' // Always get fresh data
        });

        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }

        const data: GalleryData = await response.json();

        // Add thumbnail URLs from YouTube
        const videosWithThumbnails = data.videos.map(video => ({
            ...video,
            thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
        }));


        return videosWithThumbnails;
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
}

// Get video by ID
export function getVideoById(videos: Video[], id: string): Video | undefined {
    return videos.find(video => video.id === id);
}

// Get paginated videos
export function getVideosByPage(videos: Video[], page: number, pageSize: number = 16): Video[] {
    const startIndex = (page - 1) * pageSize;
    return videos.slice(startIndex, startIndex + pageSize);
}

// Get total pages
export function getTotalPages(videos: Video[], pageSize: number = 16): number {
    return Math.ceil(videos.length / pageSize);
}

// Get related videos
export function getRelatedVideos(videos: Video[], currentId: string, count: number = 10): Video[] {
    return videos.filter(video => video.id !== currentId).slice(0, count);
}
