import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GalleryData, Video } from '@/lib/types';
import { extractYoutubeId } from '@/lib/videoUtils';

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

        const filePath = path.join(process.cwd(), 'public/data/gallery.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data: GalleryData = JSON.parse(jsonData);

        const videoIndex = data.videos.findIndex(v => v.id === id);
        if (videoIndex === -1) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        data.videos.splice(videoIndex, 1);
        data.metadata.totalVideos = data.videos.length;
        data.metadata.lastUpdated = new Date().toISOString().split('T')[0];

        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting video:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, youtubeUrl, description, duration, password } = body;

        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const filePath = path.join(process.cwd(), 'public/data/gallery.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data: GalleryData = JSON.parse(jsonData);

        const videoIndex = data.videos.findIndex(v => v.id === id);
        if (videoIndex === -1) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        const video = data.videos[videoIndex];

        if (title) video.title = title;
        if (description !== undefined) video.description = description;
        if (duration) video.duration = duration;

        if (youtubeUrl) {
            const youtubeId = extractYoutubeId(youtubeUrl);
            if (youtubeId) {
                video.youtubeId = youtubeId;
            } else {
                return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
            }
        }

        data.metadata.lastUpdated = new Date().toISOString().split('T')[0];
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

        return NextResponse.json({ success: true, video });
    } catch (error) {
        console.error('Error updating video:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
