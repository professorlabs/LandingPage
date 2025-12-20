'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Video } from '@/lib/types';
import { fetchVideos, getRelatedVideos } from '@/data/videos';
import { filterAndSortVideos } from '@/lib/searchService';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';
import SearchBar from './SearchBar';

const VIDEOS_PER_PAGE = 16;

export default function VideoGrid() {
    const [allVideos, setAllVideos] = useState<Video[]>([]);
    const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
    const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Fetch videos from JSON on mount
    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);
            const videos = await fetchVideos();
            setAllVideos(videos);
            setFilteredVideos(videos);
            setDisplayedVideos(videos.slice(0, VIDEOS_PER_PAGE));
            setHasMore(videos.length > VIDEOS_PER_PAGE);
            setLoading(false);
        };

        loadVideos();
    }, []);

    // Handle search
    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        const filtered = filterAndSortVideos(allVideos, query);
        setFilteredVideos(filtered);
        setPage(1);
        setDisplayedVideos(filtered.slice(0, VIDEOS_PER_PAGE));
        setHasMore(filtered.length > VIDEOS_PER_PAGE);
    }, [allVideos]);

    // Update displayed videos when filtered videos or page changes
    useEffect(() => {
        const startIndex = 0;
        const endIndex = page * VIDEOS_PER_PAGE;
        setDisplayedVideos(filteredVideos.slice(startIndex, endIndex));
        setHasMore(endIndex < filteredVideos.length);
    }, [filteredVideos, page]);

    // Load more videos
    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);
        setTimeout(() => {
            setPage(prev => prev + 1);
            setLoading(false);
        }, 300);
    }, [loading, hasMore]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore, loading, loadMore]);

    const handleVideoClick = (video: Video) => {
        setSelectedVideo(video);
    };

    const handleCloseModal = () => {
        setSelectedVideo(null);
    };

    const handleVideoSelect = (video: Video) => {
        setSelectedVideo(video);
    };

    if (loading && allVideos.length === 0) {
        return (
            <section className="video-grid-section">
                <div className="video-grid-loading">
                    <div className="loading-spinner"></div>
                    <span>ভিডিও লোড হচ্ছে...</span>
                </div>
            </section>
        );
    }

    return (
        <section className="video-grid-section">
            <div className="video-grid-header">
                <h2 className="video-grid-title">ভিডিও আর্কাইভ</h2>
                <SearchBar onSearch={handleSearch} />
            </div>

            {searchQuery && (
                <p className="search-results-count">
                    {filteredVideos.length} টি ভিডিও পাওয়া গেছে &quot;{searchQuery}&quot; এর জন্য
                </p>
            )}

            <div className="video-grid">
                {displayedVideos.map((video) => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onClick={handleVideoClick}
                    />
                ))}
            </div>

            {loading && allVideos.length > 0 && (
                <div className="video-grid-loading">
                    <div className="loading-spinner"></div>
                    <span>আরও লোড হচ্ছে...</span>
                </div>
            )}

            {!hasMore && displayedVideos.length > 0 && (
                <div className="video-grid-end">
                    <span>সব ভিডিও দেখানো হয়েছে</span>
                </div>
            )}

            {displayedVideos.length === 0 && !loading && (
                <div className="video-grid-empty">
                    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
                        <path d="M17 17 L31 31 M31 17 L17 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>কোন ভিডিও পাওয়া যায়নি</span>
                </div>
            )}

            <div ref={loadMoreRef} className="load-more-trigger"></div>

            {selectedVideo && (
                <VideoModal
                    video={selectedVideo}
                    allVideos={allVideos}
                    onClose={handleCloseModal}
                    onVideoSelect={handleVideoSelect}
                />
            )}
        </section>
    );
}
