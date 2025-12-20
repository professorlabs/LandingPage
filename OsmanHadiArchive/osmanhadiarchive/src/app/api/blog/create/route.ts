import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogData, BlogPost } from '@/lib/types';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title') as string;
        const excerpt = formData.get('excerpt') as string;
        const body = formData.get('body') as string;
        const author = formData.get('author') as string;
        const password = formData.get('password') as string;
        const imageFile = formData.get('image') as File;

        // Simple security check
        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!title || !body || !imageFile) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 4. Update blog.json (Read data first for slug check)
        const filePath = path.join(process.cwd(), 'public/data/blog.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data: BlogData = JSON.parse(jsonData);

        // 1. Upload image to Vercel Blob with unique name
        const filename = `blog-${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const blob = await put(filename, imageFile, {
            access: 'public',
            addRandomSuffix: true, // Generate unique filename even if 'filename' exists
        });

        // 2. Generate unique slug from title
        let baseSlug = title
            .trim()
            .toLowerCase()
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        if (!baseSlug) {
            baseSlug = `post`;
        }

        let slug = baseSlug;
        let counter = 1;
        // Check for collisions in existing posts
        while (data.posts.some(p => p.slug === slug)) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }

        // 3. Prepare new blog post
        const newPost: BlogPost = {
            id: Date.now().toString(),
            title,
            slug,
            image: blob.url,
            excerpt: excerpt || title,
            body,
            date: new Date().toISOString().split('T')[0],
            author: author || 'Admin',
        };

        data.posts.unshift(newPost); // Add to the beginning
        data.metadata.totalPosts = data.posts.length;
        data.metadata.lastUpdated = new Date().toISOString().split('T')[0];

        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));


        return NextResponse.json({ success: true, post: newPost });
    } catch (error) {
        console.error('Error in blog creation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
