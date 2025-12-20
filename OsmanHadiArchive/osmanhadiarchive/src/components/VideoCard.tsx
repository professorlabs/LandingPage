import { Video } from '@/lib/types';

interface VideoCardProps {
    video: Video;
    onClick: (video: Video) => void;
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

export default function VideoCard({ video, onClick }: VideoCardProps) {
    const handleClick = () => {
        onClick(video);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick(video);
        }
    };

    return (
        <div
            className="video-card"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Play video: ${video.title}`}
        >
            <div className="video-card-thumbnail">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                />
                <div className="video-card-duration">{video.duration}</div>
                <div className="video-card-overlay">
                    <svg
                        className="play-icon"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.7)" />
                        <path d="M19 15 L35 24 L19 33 Z" fill="white" />
                    </svg>
                </div>
            </div>
            <div className="video-card-info">
                <h3 className="video-card-title">{video.title}</h3>
                <div className="video-card-meta">
                    <span className="video-card-views">{formatViews(video.views)} views</span>
                </div>
            </div>
        </div>
    );
}
