const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Cache para armazenar resultados
const cache = new Map();
const CACHE_DURATION = 3600000; // 1 hora em milissegundos

export const fetchYoutubeVideos = async (query) => {
  try {
    // Verificar se existe cache válido
    const cached = cache.get(query);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      console.log(`✅ Usando cache para: ${query}`);
      return cached.data;
    }

    // Se não tem cache, buscar da API
    console.log(`🌐 Buscando da API: ${query}`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&maxResults=15`; // Reduzido de 20 para 15
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro na requisição");
    const data = await response.json();
    
    // Salvar no cache
    cache.set(query, {
      data: data.items || [],
      timestamp: Date.now()
    });
    
    return data.items || [];
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    return [];
  }
};
