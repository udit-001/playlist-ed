// The lesson page renders these tokens into its meta tags and the middleware
// replaces them with real video data. Both halves of that protocol live here so
// the tokens and the values they fall back to cannot drift apart.
export const META_PLACEHOLDERS = {
    title: "META TITLE",
    image: "META IMAGE",
    description: "META DESCRIPTION"
};

export const META_DEFAULTS = {
    pageTitle: "Playlist-Ed",
    title: "Playlist-Ed: Your solution to chaotic study sessions",
    image: "/images/playlist-ed-banner.png",
    description: "Streamline your study sessions by curating clutter-free, uninterrupted playlists for your focused learning."
};
