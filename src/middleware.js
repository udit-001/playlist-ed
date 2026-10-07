import { defineMiddleware } from "astro/middleware";
import { META_PLACEHOLDERS, META_DEFAULTS } from "./lib/meta.js";

const OEMBED_ENDPOINT = "https://www.youtube.com/oembed";
const REQUEST_TIMEOUT_MS = 5000;
const MAX_ATTEMPTS = 2;

// The User-Agent is a precaution: oEmbed answers without one, but YouTube bot-checks
// non-browser clients on some endpoints.
async function fetchVideoDetails(videoId){
    const target = encodeURIComponent("https://www.youtube.com/watch?v=" + videoId);

    for(let attempt = 0; attempt < MAX_ATTEMPTS; attempt++){
        try{
            const response = await fetch(`${OEMBED_ENDPOINT}?url=${target}&format=json`, {
                headers: {
                    accept: "application/json",
                    "User-Agent": "Mozilla/5.0"
                },
                signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
            });

            if(!response.ok){
                continue;
            }

            const data = await response.json();
            return {
                title: String(data.title ?? "").trim(),
                thumbnail: String(data.thumbnail_url ?? "").trim()
            };
        }
        catch(error){
            console.warn(`oEmbed lookup attempt ${attempt + 1} failed for ${videoId}.`, error);
        }
    }

    return null;
}

export const onRequest = async (context, next) => {
    const response = await next();

    if(!context.url.pathname.includes("lessons")){
        return response;
    }

    const videoId = context.url.pathname.split("/")[3];
    const video = videoId ? await fetchVideoDetails(videoId) : null;

    const title = video?.title ? video.title + " | Playlist-Ed" : META_DEFAULTS.title;
    const thumbnail = video?.thumbnail || META_DEFAULTS.image;
    const description = video?.title ? "View on Playlist-Ed" : META_DEFAULTS.description;

    const html = await response.text();
    const updatedHtml = html
        .replaceAll(META_PLACEHOLDERS.title, title)
        .replaceAll(META_PLACEHOLDERS.image, thumbnail)
        .replaceAll(META_PLACEHOLDERS.description, description);

    // The body length changed, so a carried-over content-length would be wrong.
    const headers = new Headers(response.headers);
    headers.delete("content-length");

    return new Response(updatedHtml, {
        status: response.status,
        headers
    });
};
