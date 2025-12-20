import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GalleryData, Video } from '@/lib/types';
import { extractYoutubeId } from '@/lib/videoUtils';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, youtubeUrl, description, duration, password } = body;

        // Simple security check
        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!title || !youtubeUrl) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const youtubeId = extractYoutubeId(youtubeUrl);
        if (!youtubeId) {
            return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'public/data/gallery.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data: GalleryData = JSON.parse(jsonData);

        const newVideo: Video = {
            id: Date.now().toString(),
            youtubeId,
            title,
            description: description || '',
            views: 0,
            duration: duration || '0:00',
        };

        data.videos.unshift(newVideo);
        data.metadata.totalVideos = data.videos.length;
        data.metadata.lastUpdated = new Date().toISOString().split('T')[0];

        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

        return NextResponse.json({ success: true, video: newVideo });
    } catch (error) {
        console.error('Error in gallery creation:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
