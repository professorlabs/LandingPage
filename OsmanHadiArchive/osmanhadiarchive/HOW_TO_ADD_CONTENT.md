# How to Add Content to Osman Hadi Archive

This guide explains how to add new videos and blog posts to the website by editing JSON files.

## Adding New Videos to Gallery

Edit the file: `/public/data/gallery.json`

### Steps:

1. Open `public/data/gallery.json`
2. Add a new video object to the `videos` array
3. Update the `metadata.totalVideos` count

### Video Object Format:

```json
{
  "id": "6",
  "youtubeId": "YOUR_YOUTUBE_VIDEO_ID",
  "title": "ভিডিওর শিরোনাম",
  "description": "ভিডিওর বিবরণ",
  "views": 50000,
  "duration": "10:30"
}
```

### How to Get YouTube Video ID:

From a YouTube URL like: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
The video ID is: `dQw4w9WgXcQ` (the part after `v=`)

### Example:

```json
{
  "videos": [
    {
      "id": "1",
      "youtubeId": "dQw4w9WgXcQ",
      "title": "বাংলাদেশের স্বাধীনতার ইতিহাস",
      "description": "বাংলাদেশের মুক্তিযুদ্ধের গল্প",
      "views": 125000,
      "duration": "12:34"
    },
    {
      "id": "6",
      "youtubeId": "NEW_VIDEO_ID",
      "title": "নতুন ভিডিও",
      "description": "নতুন ভিডিওর বিবরণ",
      "views": 10000,
      "duration": "8:20"
    }
  ],
  "metadata": {
    "lastUpdated": "2025-12-19",
    "totalVideos": 6,
    "source": "YouTube Channel"
  }
}
```

---

## Adding New Blog Posts

Edit the file: `/public/data/blog.json`

### Steps:

1. Open `public/data/blog.json`
2. Add a new post object to the `posts` array
3. Update the `metadata.totalPosts` count
4. Make sure the image file exists in the `/public` folder

### Blog Post Object Format:

```json
{
  "id": "4",
  "title": "পোস্টের শিরোনাম",
  "slug": "post-url-slug",
  "image": "/image-name.png",
  "excerpt": "সংক্ষিপ্ত বিবরণ",
  "body": "পূর্ণ বিবরণ প্রথম প্যারাগ্রাফ\n\nদ্বিতীয় প্যারাগ্রাফ\n\nতৃতীয় প্যারাগ্রাফ",
  "date": "2025-12-20",
  "author": "লেখকের নাম"
}
```

### Important Notes:

- **id**: Must be unique
- **slug**: URL-friendly version of title (lowercase, hyphens instead of spaces)
- **image**: Path to image in `/public` folder (e.g., `/hero-name.png`)
- **body**: Use `\n\n` to separate paragraphs
- **date**: Format as `YYYY-MM-DD`

### Example:

```json
{
  "posts": [
    {
      "id": "1",
      "title": "আবরার ফাহাদ: একজন সাহসী ছাত্রের গল্প",
      "slug": "abrar-fahad-story",
      "image": "/abrar-fahad.png",
      "excerpt": "আবরার ফাহাদ ছিলেন বুয়েটের একজন মেধাবী ছাত্র",
      "body": "প্রথম প্যারাগ্রাফ\n\nদ্বিতীয় প্যারাগ্রাফ",
      "date": "2025-12-15",
      "author": "Osman Hadi Archive Team"
    },
    {
      "id": "4",
      "title": "নতুন পোস্ট",
      "slug": "new-post",
      "image": "/new-image.png",
      "excerpt": "নতুন পোস্টের সংক্ষিপ্ত বিবরণ",
      "body": "নতুন পোস্টের পূর্ণ বিবরণ",
      "date": "2025-12-20",
      "author": "লেখকের নাম"
    }
  ],
  "metadata": {
    "lastUpdated": "2025-12-20",
    "totalPosts": 4
  }
}
```

---

## Tips

1. **Always validate your JSON** before saving (use a JSON validator online)
2. **Keep backups** of your JSON files before making changes
3. **Test locally** after adding new content
4. **Image files** must be placed in the `/public` folder
5. **Refresh the page** after updating JSON files to see changes

---

## Fetching Videos from Your YouTube Channel

To automatically fetch videos from your YouTube channel, you would need to:

1. Get a YouTube Data API key from Google Cloud Console
2. Use the YouTube Data API v3 to fetch videos
3. Create a server-side script to periodically update the JSON file

For now, **manually adding videos to the JSON file is the simplest approach** and gives you full control over which videos appear on the site.

---

## File Locations

- Gallery videos: `/public/data/gallery.json`
- Blog posts: `/public/data/blog.json`
- Images: `/public/` (e.g., `/public/hero-name.png`)

---

## Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Validate your JSON syntax
3. Ensure all image paths are correct
4. Make sure IDs are unique
