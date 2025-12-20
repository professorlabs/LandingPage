import { put, del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogData, BlogPost } from '@/lib/types';

const JSON_PATH = path.join(process.cwd(), 'public/data/blog.json');

function getBlogData(): BlogData {
    const jsonData = fs.readFileSync(JSON_PATH, 'utf8');
    return JSON.parse(jsonData);
}

function saveBlogData(data: BlogData) {
    fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 4));
}

// DELETE: Remove blog and its image
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { password } = await request.json();

        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = getBlogData();
        const postIndex = data.posts.findIndex((p) => p.id === id);

        if (postIndex === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const post = data.posts[postIndex];

        // 1. Delete image from Vercel Blob
        if (post.image.includes('public.blob.vercel-storage.com')) {
            try {
                await del(post.image);
            } catch (blobError) {
                console.error('Failed to delete blob:', blobError);
                // Continue with JSON deletion even if blob deletion fails
            }
        }

        // 2. Update JSON
        data.posts.splice(postIndex, 1);
        data.metadata.totalPosts = data.posts.length;
        data.metadata.lastUpdated = new Date().toISOString().split('T')[0];

        saveBlogData(data);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in blog deletion:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PATCH: Update blog details
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const formData = await request.formData();

        const password = formData.get('password') as string;
        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = getBlogData();
        const postIndex = data.posts.findIndex((p) => p.id === id);

        if (postIndex === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const post = data.posts[postIndex];
        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const body = formData.get('body') as string;
        const author = formData.get('author') as string;
        const imageFile = formData.get('image') as File | null;

        // 1. Handle image change
        if (imageFile && imageFile.size > 0) {
            // Delete old image
            if (post.image.includes('public.blob.vercel-storage.com')) {
                try { await del(post.image); } catch (e) { }
            }
            // Upload new image
            const filename = `blog-${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const blob = await put(filename, imageFile, {
                access: 'public',
                addRandomSuffix: true,
            });
            post.image = blob.url;
        }

        // 2. Update other fields
        if (title) {
            post.title = title;
            // Only update slug if title changed significantly? Let's keep existing slug for SEO stability
            // or update it if the user wants. For now, keep it stable unless title changes.
        }
        if (excerpt) post.excerpt = excerpt;
        if (body) post.body = body;
        if (author) post.author = author;

        data.metadata.lastUpdated = new Date().toISOString().split('T')[0];
        saveBlogData(data);

        return NextResponse.json({ success: true, post });
    } catch (error) {
        console.error('Error in blog update:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
