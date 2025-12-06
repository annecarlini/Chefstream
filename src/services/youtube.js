const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function fetchYoutubeVideos(query) {
  try {
    if (!API_KEY) {
      console.error("❌ ERRO: VITE_YOUTUBE_API_KEY não encontrada no .env");
      return [];
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${encodeURIComponent(
      query
    )}&key=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.items) {
      console.error("❌ A API do YouTube retornou erro:", data);
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("❌ Erro ao consultar API do YouTube:", error);
    return [];
  }
}
