import { Innertube } from 'youtubei.js/cf-worker';

// Reused across requests within the same isolate.
let clientPromise;

function getClient() {
    if (!clientPromise) {
        // retrieve_player: false skips fetching and parsing YouTube's player
        // script. That script is the only path that needs a JS evaluator, which
        // Workers do not allow. Playlist metadata does not need it.
        clientPromise = Innertube.create({ retrieve_player: false });
    }
    return clientPromise;
}

function json(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'content-type': 'application/json',
            'cache-control': 'no-store'
        }
    });
}

// Thumbnails arrive as several sizes; take the one closest to a target width.
function pickThumbnail(thumbnails, target = 480) {
    if (!Array.isArray(thumbnails)) return '';
    const usable = thumbnails.filter((t) => t && t.url);
    if (usable.length === 0) return '';
    return usable.reduce((best, t) =>
        Math.abs((t.width ?? 0) - target) < Math.abs((best.width ?? 0) - target) ? t : best
    ).url;
}

// YouTube returns playlist entries as either PlaylistVideo (id/title) or
// LockupView (content_id/content_type + metadata.title), depending on which
// surface answered. Normalise both to { name, watchId }, or null to skip.
function normalizeItem(item) {
    if (!item) return null;

    const isPlayable = item.content_type === undefined
        || item.content_type === 'VIDEO'
        || item.content_type === 'SHORT';

    const watchId = item.id ?? (isPlayable ? item.content_id : undefined);
    if (!watchId) return null;

    const name = item.title?.toString?.() ?? item.metadata?.title?.toString?.() ?? '';

    return { name, watchId };
}

// total_items reads like "26 videos" or "1,234 videos".
function parseTotalItems(value) {
    const digits = String(value ?? '').replace(/[^\d]/g, '');
    if (digits === '') return null;
    return Number.parseInt(digits, 10);
}

const MAX_PAGES = 50;

export const prerender = false;

export async function GET({ url }) {
    const playlistId = url.searchParams.get('id');
    if (!playlistId) {
        return json({ error: 'Missing "id" query parameter.' }, 400);
    }

    let yt;
    try {
        yt = await getClient();
    }
    catch (error) {
        clientPromise = undefined;
        return json({ error: 'Could not initialise the YouTube client.', detail: String(error?.message ?? error) }, 502);
    }

    let first;
    try {
        first = await yt.getPlaylist(playlistId);
    }
    catch (error) {
        return json({ error: 'Could not load that playlist. It may be private or deleted.', detail: String(error?.message ?? error) }, 404);
    }

    const info = first.info ?? {};

    // YouTube returns roughly 100 items per page, so page through the rest to
    // match what the Invidious endpoint returned in a single response.
    const videos = [];
    let page = first;
    for (let i = 0; i < MAX_PAGES && page; i++) {
        for (const item of page.items ?? []) {
            const video = normalizeItem(item);
            if (video) videos.push(video);
        }
        if (!page.has_continuation) break;
        try {
            page = await page.getContinuation();
        }
        catch {
            break;
        }
    }

    if (videos.length === 0) {
        return json({ error: 'That playlist has no videos.' }, 404);
    }

    const totalItems = parseTotalItems(info.total_items);

    return json({
        title: info.title ?? '',
        playlistId,
        author: info.author?.name ?? '',
        authorImg: info.author?.best_thumbnail?.url ?? info.author?.avatar_thumbnail_url ?? '',
        playlistThumbnail: pickThumbnail(info.thumbnails, 480),
        videoCount: totalItems ?? videos.length,
        recentVideo: videos[0].watchId,
        videos
    });
}
