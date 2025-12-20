import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BlogPost, BlogData } from '@/lib/types';
import { getBlogDataServer } from '@/data/blog';
import ShareButtons from '@/components/ShareButtons';


// Generate static params for all blog posts
export async function generateStaticParams() {
    const data = await getBlogDataServer();
    return data.posts.map((post) => ({
        id: post.id,
    }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const data = await getBlogDataServer();
    const post = data.posts.find((p) => p.id === id);

    if (!post) {
        return {
            title: 'পোস্ট পাওয়া যায়নি | Osman Hadi Archive',
        };
    }

    return {
        title: `${post.title} | Osman Hadi Archive`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getBlogDataServer();
    const post = data.posts.find((p) => p.id === id);

    if (!post) {
        notFound();
    }


    return (
        <div className="blog-post-page">
            <div className="page-container">
                <article className="blog-post-detail">
                    <header className="post-header">
                        <Link href="/blog" className="back-link">
                            ← ব্লগে ফিরে যান
                        </Link>
                        <h1 className="post-title">{post.title}</h1>
                        <div className="post-meta">
                            <time className="post-date">
                                {new Date(post.date).toLocaleDateString('bn-BD', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                            <span className="post-author">লেখক: {post.author}</span>
                        </div>
                    </header>

                    <div className="post-featured-image">
                        <Image
                            src={post.image}
                            alt={post.title}
                            width={1200}
                            height={600}
                            priority
                            style={{ objectFit: 'cover', borderRadius: '12px' }}
                        />
                    </div>

                    <div className="post-content">
                        {post.body.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <footer className="post-footer">
                        <div className="share-section">
                            <h3>শেয়ার করুন:</h3>
                            <ShareButtons blogId={post.id} title={post.title} />
                        </div>
                    </footer>

                </article>
            </div>
        </div>
    );
}
