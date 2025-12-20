import { Video, SearchResult } from './types';

// Search service following Single Responsibility Principle
// Implements fuzzy semantic search for Bangla and English text

function normalizeText(text: string): string {
    return text.toLowerCase().trim();
}

function calculateRelevanceScore(video: Video, query: string): number {
    const normalizedQuery = normalizeText(query);
    const normalizedTitle = normalizeText(video.title);
    const normalizedDescription = normalizeText(video.description);

    let score = 0;

    // Exact match in title gets highest score
    if (normalizedTitle.includes(normalizedQuery)) {
        score += 100;
    }

    // Exact match in description
    if (normalizedDescription.includes(normalizedQuery)) {
        score += 50;
    }

    // Word-level matching for better semantic search
    const queryWords = normalizedQuery.split(/\s+/);
    const titleWords = normalizedTitle.split(/\s+/);
    const descWords = normalizedDescription.split(/\s+/);

    for (const queryWord of queryWords) {
        if (queryWord.length < 2) continue;

        for (const titleWord of titleWords) {
            if (titleWord.includes(queryWord) || queryWord.includes(titleWord)) {
                score += 25;
            }
        }

        for (const descWord of descWords) {
            if (descWord.includes(queryWord) || queryWord.includes(descWord)) {
                score += 10;
            }
        }
    }

    // Boost by view count (normalized)
    score += Math.min(video.views / 10000, 10);

    return score;
}

export function searchVideos(videos: Video[], query: string): SearchResult[] {
    if (!query || query.trim().length === 0) {
        return videos.map(video => ({ video, score: 0 }));
    }

    const results: SearchResult[] = videos
        .map(video => ({
            video,
            score: calculateRelevanceScore(video, query)
        }))
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score);

    return results;
}

export function filterAndSortVideos(videos: Video[], query: string): Video[] {
    if (!query || query.trim().length === 0) {
        return videos;
    }

    return searchVideos(videos, query).map(result => result.video);
}
