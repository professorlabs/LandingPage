'use client';

import { useState, useEffect } from 'react';

interface ShareButtonsProps {
    blogId: string;
    title: string;
}

export default function ShareButtons({ blogId, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        // Set URL only on client side to avoid hydration mismatch
        setShareUrl(`${window.location.origin}/blog/${blogId}`);
    }, [blogId]);

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    };

    return (
        <div className="share-buttons-container">
            <button
                onClick={handleCopyLink}
                className={`share-btn copy-btn ${copied ? 'copied' : ''}`}
                title="লিঙ্ক কপি করুন"
                type="button"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                {copied ? 'কপি হয়েছে!' : 'লিঙ্ক কপি'}
            </button>

            <a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn fb-btn"
                title="ফেসবুকে শেয়ার করুন"
            >
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                ফেসবুক
            </a>

            <a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn x-btn"
                title="এক্স (টুইটার)-এ শেয়ার করুন"
            >
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                এক্স (X)
            </a>
        </div>
    );
}
