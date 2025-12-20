export function extractYoutubeId(url: string): string | null {
    if (!url) return null;

    // Check if it's already an ID
    if (url.length === 11 && !url.includes('/') && !url.includes('.')) {
        return url;
    }

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}
