'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('/api/blog/create', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'ব্লগ সফলভাবে তৈরি হয়েছে!' });
                e.currentTarget.reset();
                // Optionally redirect
                // setTimeout(() => router.push('/blog'), 2000);
            } else {
                setMessage({ type: 'error', text: result.error || 'কিছু ভুল হয়েছে।' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'সার্ভারে সংযোগ করতে সমস্যা হয়েছে।' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-blog-page">
            <div className="page-container">
                <div className="admin-form-container">
                    <h1 className="page-title">নতুন ব্লগ তৈরি করুন</h1>

                    {message && (
                        <div className={`message-banner ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-group">
                            <label htmlFor="title">ব্লগের শিরোনাম *</label>
                            <input type="text" id="title" name="title" required placeholder="শিরোনাম লিখুন" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="excerpt">সংক্ষিপ্ত বর্ণনা</label>
                            <textarea id="excerpt" name="excerpt" placeholder="ব্লগ সম্পর্কে ছোট কিছু লিখুন" rows={3}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="body">ব্লগের মূল বক্তব্য (Markdown ব্যবহার করা যাবে) *</label>
                            <textarea id="body" name="body" required placeholder="বিস্তারিত লিখুন... প্যারাগ্রাফের জন্য দুইবার এন্টার দিন।" rows={10}></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">লেখকের নাম</label>
                            <input type="text" id="author" name="author" placeholder="লেখকের নাম (ঐচ্ছিক)" defaultValue="Osman Hadi Archive Team" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">ব্লগ ইমেজ নির্বাচন করুন *</label>
                            <input type="file" id="image" name="image" accept="image/*" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">অ্যাডমিন পাসওয়ার্ড *</label>
                            <input type="password" id="password" name="password" required placeholder="পাসওয়ার্ড দিন" />
                        </div>

                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? 'তৈরি করা হচ্ছে...' : 'ব্লগ পাবলিশ করুন'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
