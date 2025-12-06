const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchYoutubeVideos = async (query) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&maxResults=20`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro na requisição");
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return [];
  }
};
