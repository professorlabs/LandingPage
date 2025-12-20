// Video interface for YouTube-style video cards

export interface Video {
    id: string;
    youtubeId: string;
    title: string;
    description: string;
    views: number;
    duration: string;
    thumbnail?: string;
}

// Blog post interface
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    image: string;
    excerpt: string;
    body: string;
    date: string;
    author: string;
}

// Hero interface for footer memorial section
export interface Hero {
    id: string;
    name: string;
    image: string;
    role?: string;
}

// Search result with relevance score
export interface SearchResult {
    video: Video;
    score: number;
}

// API Response types
export interface GalleryData {
    videos: Video[];
    metadata: {
        lastUpdated: string;
        totalVideos: number;
        source: string;
    };
}

export interface BlogData {
    posts: BlogPost[];
    metadata: {
        lastUpdated: string;
        totalPosts: number;
    };
}
