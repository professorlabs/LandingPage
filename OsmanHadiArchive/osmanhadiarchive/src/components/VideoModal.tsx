import { useEffect, useCallback, useState } from 'react';
import { Video } from '@/lib/types';
import { getRelatedVideos } from '@/data/videos';

interface VideoModalProps {
    video: Video;
    allVideos: Video[];
    onClose: () => void;
    onVideoSelect: (video: Video) => void;
}

function formatViews(views: number): string {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
}

export default function VideoModal({ video, allVideos, onClose, onVideoSelect }: VideoModalProps) {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const relatedVideos = getRelatedVideos(allVideos, video.id, 10);

    const handleEscape = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        setIframeLoaded(false); // Reset when video changes
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [handleEscape, video.id]);

    return (
        <div className="video-modal-backdrop" onClick={handleBackdropClick}>
            <div className="video-modal">
                <button
                    className="video-modal-close"
                    onClick={onClose}
                    aria-label="Close video modal"
                >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                <div className="video-modal-content">
                    <div className="video-modal-player">
                        <div className="video-player-wrapper">
                            {!iframeLoaded && (
                                <div className="video-player-placeholder">
                                    <img src={video.thumbnail} alt="" className="placeholder-image" />
                                    <div className="loading-spinner"></div>
                                </div>
                            )}
                            <iframe
                                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={() => setIframeLoaded(true)}
                                className={iframeLoaded ? 'loaded' : ''}
                            />
                        </div>
                        <div className="video-modal-info">
                            <h2 className="video-modal-title">{video.title}</h2>
                            <div className="video-modal-meta">
                                <span className="video-modal-views">{formatViews(video.views)} views</span>
                            </div>
                            <p className="video-modal-description">{video.description}</p>
                        </div>
                    </div>

                    <div className="video-modal-sidebar">

                        <h3 className="video-modal-sidebar-title">সম্পর্কিত ভিডিও</h3>
                        <div className="video-modal-related">
                            {relatedVideos.map((relatedVideo) => (
                                <div
                                    key={relatedVideo.id}
                                    className="related-video-card"
                                    onClick={() => onVideoSelect(relatedVideo)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            onVideoSelect(relatedVideo);
                                        }
                                    }}
                                >
                                    <div className="related-video-thumbnail">
                                        <img
                                            src={relatedVideo.thumbnail}
                                            alt={relatedVideo.title}
                                            loading="lazy"
                                        />
                                        <span className="related-video-duration">{relatedVideo.duration}</span>
                                    </div>
                                    <div className="related-video-info">
                                        <h4 className="related-video-title">{relatedVideo.title}</h4>
                                        <span className="related-video-views">{formatViews(relatedVideo.views)} views</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
