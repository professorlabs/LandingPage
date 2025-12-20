import { BlogPost, BlogData } from '@/lib/types';
import fs from 'fs';
import path from 'path';

// Server-side helper to fetch blog posts from JSON file
export async function getBlogDataServer(): Promise<BlogData> {
    try {
        const filePath = path.join(process.cwd(), 'public/data/blog.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error fetching blog posts on server:', error);
        return { posts: [], metadata: { lastUpdated: '', totalPosts: 0 } };
    }
}

// Client-side helper (can be used if needed, but server-side is preferred for SEO)
export async function fetchBlogPostsClient(): Promise<BlogPost[]> {
    try {
        const response = await fetch('/data/blog.json', {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }

        const data: BlogData = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error fetching blog posts on client:', error);
        return [];
    }
}

// Get blog post by slug
export function getPostBySlug(posts: BlogPost[], slug: string): BlogPost | undefined {
    return posts.find(post => post.slug === slug);
}

// Get blog post by ID
export function getPostById(posts: BlogPost[], id: string): BlogPost | undefined {
    return posts.find(post => post.id === id);
}

// Get recent posts
export function getRecentPosts(posts: BlogPost[], count: number = 3): BlogPost[] {
    return [...posts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
}
