import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, BlogData } from '@/lib/types';
import fs from 'fs';
import path from 'path';

// SEO Metadata for the Blog Page
export const metadata: Metadata = {
    title: 'ব্লগ | Osman Hadi Archive',
    description: 'আমাদের বীরদের গল্প এবং ইতিহাস নিয়ে লেখা ব্লগসমূহ।',
    openGraph: {
        title: 'ব্লগ | Osman Hadi Archive',
        description: 'আমাদের বীরদের গল্প এবং ইতিহাস নিয়ে লেখা ব্লগসমূহ।',
        images: ['/og-blog.png'], // Make sure to have a default OG image if possible
    },
};

import { getBlogDataServer } from '@/data/blog';

export default async function BlogPage() {
    const data = await getBlogDataServer();
    const posts = data.posts;

    if (posts.length === 0) {
        return (
            <div className="blog-coming-soon">
                <h1>ব্লগ</h1>
                <p>শীঘ্রই আসছে...</p>
                <p>আমাদের বীরদের গল্প এবং ইতিহাস নিয়ে লেখা প্রকাশিত হবে।</p>
            </div>
        );
    }

    return (
        <div className="blog-page">
            <div className="page-container">
                <h1 className="page-title">ব্লগ</h1>
                <div className="blog-grid">
                    {posts.map((post) => (
                        <article key={post.id} className="blog-card">
                            <Link href={`/blog/${post.slug}`} target="_blank" className="blog-card-link">
                                <div className="blog-card-image">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        width={400}
                                        height={250}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="blog-card-content">
                                    <time className="blog-card-date">
                                        {new Date(post.date).toLocaleDateString('bn-BD')}
                                    </time>
                                    <h2 className="blog-card-title">{post.title}</h2>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                    <div className="blog-card-footer">
                                        <span className="blog-card-author">লেখক: {post.author}</span>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
