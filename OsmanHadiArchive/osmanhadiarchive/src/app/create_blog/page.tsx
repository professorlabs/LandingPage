'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, BlogData, Video, GalleryData } from '@/lib/types';
import Image from 'next/image';

type Tab = 'blog' | 'gallery';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>('blog');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Blog states
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
    const [blogConfirmPassword, setBlogConfirmPassword] = useState('');

    // Gallery states
    const [videos, setVideos] = useState<Video[]>([]);
    const [editingVideo, setEditingVideo] = useState<Video | null>(null);
    const [deletingVideoId, setDeletingVideoId] = useState<string | null>(null);
    const [videoConfirmPassword, setVideoConfirmPassword] = useState('');

    useEffect(() => {
        if (activeTab === 'blog') fetchPosts();
        if (activeTab === 'gallery') fetchVideos();
    }, [activeTab]);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/data/blog.json');
            const data: BlogData = await res.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    };

    const fetchVideos = async () => {
        try {
            const res = await fetch('/data/gallery.json');
            const data: GalleryData = await res.json();
            // Assign thumbnails if missing (same logic as search)
            const videosWithThumbnails = data.videos.map(video => ({
                ...video,
                thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
            }));
            setVideos(videosWithThumbnails);
        } catch (error) {
            console.error('Failed to fetch videos:', error);
        }
    };

    const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        formData.append('password', password);

        const url = editingPost
            ? `/api/blog/${editingPost.id}`
            : '/api/blog/create';

        const method = editingPost ? 'PATCH' : 'POST';

        try {
            const response = await fetch(url, { method, body: formData });
            const result = await response.json();

            if (response.ok) {
                setMessage({
                    type: 'success',
                    text: editingPost ? 'ব্লগ সফলভাবে আপডেট হয়েছে!' : 'ব্লগ সফলভাবে তৈরি হয়েছে!'
                });
                if (!editingPost) e.currentTarget.reset();
                setEditingPost(null);
                fetchPosts();
            } else {
                setMessage({ type: 'error', text: result.error || 'কিছু ভুল হয়েছে।' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'সার্ভারে সংযোগ করতে সমস্যা হয়েছে।' });
        } finally {
            setLoading(false);
        }
    };

    const handleVideoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const videoData = {
            title: formData.get('title'),
            youtubeUrl: formData.get('youtubeUrl'),
            description: formData.get('description'),
            duration: formData.get('duration'),
            password: password
        };

        const url = editingVideo
            ? `/api/gallery/${editingVideo.id}`
            : '/api/gallery/create';

        const method = editingVideo ? 'PATCH' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(videoData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({
                    type: 'success',
                    text: editingVideo ? 'ভিডিও সফলভাবে আপডেট হয়েছে!' : 'ভিডিও সফলভাবে যুক্ত হয়েছে!'
                });
                if (!editingVideo) e.currentTarget.reset();
                setEditingVideo(null);
                fetchVideos();
            } else {
                setMessage({ type: 'error', text: result.error || 'কিছু ভুল হয়েছে।' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'সার্ভারে সংযোগ করতে সমস্যা হয়েছে।' });
        } finally {
            setLoading(false);
        }
    };

    const handleBlogDelete = async (post: BlogPost) => {
        if (!blogConfirmPassword) {
            setMessage({ type: 'error', text: 'পাসওয়ার্ড দিন।' });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/blog/${post.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: blogConfirmPassword }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'ব্লগ মুছে ফেলা হয়েছে।' });
                setDeletingPostId(null);
                setBlogConfirmPassword('');
                fetchPosts();
            } else {
                const result = await response.json();
                setMessage({ type: 'error', text: result.error || 'মুছতে সমস্যা হয়েছে।' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'সার্ভারে সংযোগ করতে সমস্যা হয়েছে।' });
        } finally {
            setLoading(false);
        }
    };

    const handleVideoDelete = async (video: Video) => {
        if (!videoConfirmPassword) {
            setMessage({ type: 'error', text: 'পাসওয়ার্ড দিন।' });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/gallery/${video.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: videoConfirmPassword }),
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'ভিডিও মুছে ফেলা হয়েছে।' });
                setDeletingVideoId(null);
                setVideoConfirmPassword('');
                fetchVideos();
            } else {
                const result = await response.json();
                setMessage({ type: 'error', text: result.error || 'মুছতে সমস্যা হয়েছে।' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'সার্ভারে সংযোগ করতে সমস্যা হয়েছে।' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="page-container">
                <div className="admin-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'blog' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('blog'); setMessage(null); setEditingPost(null); }}
                    >
                        ব্লগ ম্যানেজমেন্ট
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('gallery'); setMessage(null); setEditingVideo(null); }}
                    >
                        গ্যালারি ম্যানেজমেন্ট
                    </button>
                </div>

                <div className="admin-form-container">
                    <h1 className="page-title">
                        {activeTab === 'blog'
                            ? (editingPost ? 'ব্লগ এডিট করুন' : 'নতুন ব্লগ তৈরি করুন')
                            : (editingVideo ? 'ভিডিও এডিট করুন' : 'নতুন ভিডিও যুক্ত করুন')
                        }
                    </h1>

                    {message && (
                        <div className={`message-banner ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={activeTab === 'blog' ? handleBlogSubmit : handleVideoSubmit} className="admin-form">
                        {activeTab === 'blog' ? (
                            <>
                                <div className="form-group">
                                    <label htmlFor="title">ব্লগের শিরোনাম *</label>
                                    <input type="text" id="title" name="title" required defaultValue={editingPost?.title || ''} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="excerpt">সংক্ষিপ্ত বর্ণনা</label>
                                    <textarea id="excerpt" name="excerpt" defaultValue={editingPost?.excerpt || ''} rows={3}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="body">ব্লগের মূল বক্তব্য *</label>
                                    <textarea id="body" name="body" required defaultValue={editingPost?.body || ''} rows={10}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author">লেখকের নাম</label>
                                    <input type="text" id="author" name="author" defaultValue={editingPost?.author || 'Osman Hadi Archive Team'} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">{editingPost ? 'নতুন ইমেজ (ঐচ্ছিক)' : 'ব্লগ ইমেজ নির্বাচন করুন *'}</label>
                                    <input type="file" id="image" name="image" accept="image/*" required={!editingPost} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label htmlFor="videoTitle">ভিডিওর শিরোনাম *</label>
                                    <input type="text" id="videoTitle" name="title" required defaultValue={editingVideo?.title || ''} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="youtubeUrl">ইউটিউব ইউআরএল বা আইডি *</label>
                                    <input
                                        type="text" id="youtubeUrl" name="youtubeUrl" required
                                        defaultValue={editingVideo?.youtubeId
                                            ? `https://www.youtube.com/watch?v=${editingVideo.youtubeId}`
                                            : ''
                                        }
                                        placeholder="e.g. https://www.youtube.com/watch?v=XXXXXX"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="videoDescription">বিস্তারিত বর্ণনা</label>
                                    <textarea id="videoDescription" name="description" defaultValue={editingVideo?.description || ''} rows={4}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="duration">ভিডিওর দৈর্ঘ্য</label>
                                    <input type="text" id="duration" name="duration" defaultValue={editingVideo?.duration || '0:00'} placeholder="e.g. 10:15" />
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <label htmlFor="password">অ্যাডমিন পাসওয়ার্ড *</label>
                            <input
                                type="password" id="password" name="password" required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="পাসওয়ার্ড দিন"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" disabled={loading} className="submit-btn primary">
                                {loading ? 'সংরক্ষণ করা হচ্ছে...' : 'জমা দিন'}
                            </button>
                            {(editingPost || editingVideo) && (
                                <button
                                    type="button"
                                    onClick={() => { setEditingPost(null); setEditingVideo(null); setMessage(null); }}
                                    className="submit-btn secondary"
                                >
                                    বাতিল করুন
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="admin-posts-list">
                    <h2 className="section-title">
                        {activeTab === 'blog'
                            ? `বর্তমান ব্লগসমূহ (${posts.length})`
                            : `বর্তমান ভিডিওসমূহ (${videos.length})`
                        }
                    </h2>
                    <div className="management-grid">
                        {activeTab === 'blog' ? posts.map((post) => (
                            <div key={post.id} className="management-card">
                                <div className="card-thumb">
                                    <Image src={post.image} alt="" width={60} height={45} style={{ objectFit: 'cover' }} />
                                </div>
                                <div className="card-info">
                                    <h3>{post.title}</h3>
                                    <p>{post.date}</p>
                                </div>
                                <div className="card-actions">
                                    {deletingPostId === post.id ? (
                                        <div className="inline-delete-form">
                                            <input
                                                type="password" placeholder="পাসওয়ার্ড দিন"
                                                value={blogConfirmPassword}
                                                onChange={(e) => setBlogConfirmPassword(e.target.value)}
                                                className="confirm-input"
                                            />
                                            <button onClick={() => handleBlogDelete(post)} className="delete-btn">নিশ্চিত করুন</button>
                                            <button onClick={() => { setDeletingPostId(null); setBlogConfirmPassword(''); }} className="cancel-btn">বাতিল</button>
                                        </div>
                                    ) : (
                                        <>
                                            <button onClick={() => { setEditingPost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="edit-btn">এডিট</button>
                                            <button onClick={() => setDeletingPostId(post.id)} className="delete-btn">মুছুন</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )) : videos.map((video) => (
                            <div key={video.id} className="management-card">
                                <div className="card-thumb">
                                    {video.thumbnail && <Image src={video.thumbnail} alt="" width={60} height={45} style={{ objectFit: 'cover' }} />}
                                </div>
                                <div className="card-info">
                                    <h3>{video.title}</h3>
                                    <p>{video.duration}</p>
                                </div>
                                <div className="card-actions">
                                    {deletingVideoId === video.id ? (
                                        <div className="inline-delete-form">
                                            <input
                                                type="password" placeholder="পাসওয়ার্ড দিন"
                                                value={videoConfirmPassword}
                                                onChange={(e) => setVideoConfirmPassword(e.target.value)}
                                                className="confirm-input"
                                            />
                                            <button onClick={() => handleVideoDelete(video)} className="delete-btn">নিশ্চিত করুন</button>
                                            <button onClick={() => { setDeletingVideoId(null); setVideoConfirmPassword(''); }} className="cancel-btn">বাতিল</button>
                                        </div>
                                    ) : (
                                        <>
                                            <button onClick={() => { setEditingVideo(video); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="edit-btn">এডিট</button>
                                            <button onClick={() => setDeletingVideoId(video.id)} className="delete-btn">মুছুন</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

