// src/components/TittleCards/TittleCardsYoutube.jsx
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TitleCards.css";
import { fetchYoutubeVideos } from "../../services/youtube"; // ajuste caminho se necessário

const TittleCardsYoutube = ({ title, query }) => {
  const [videos, setVideos] = useState([]);
  const cardsRef = useRef();
  const navigate = useNavigate();

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const ref = cardsRef.current;
    if (ref) ref.addEventListener("wheel", handleWheel);
    return () => {
      if (ref) ref.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetchYoutubeVideos(query)
      .then((items) => {
        if (!active) return;
        // normalize: alguns itens podem não ter id.videoId — filtramos
        const vids = (items || []).filter(
          (it) => it && it.id && (it.id.videoId || (it.id.kind === "youtube#video" && it.id))
        );
        setVideos(vids);
      })
      .catch((err) => {
        console.error("Erro fetchYoutubeVideos:", err);
        setVideos([]);
      });
    return () => (active = false);
  }, [query]);

  const openVideo = (video) => {
    // pega o videoId de forma segura
    const videoId = video?.id?.videoId || (video?.id?.kind === "youtube#video" && video.id);
    if (!videoId) {
      console.warn("videoId inválido para este item:", video);
      return;
    }
    navigate(`/player/${videoId}`);
  };

  return (
    <div className="title-cards">
      <h2 className="sub-title">{title || "Popular no Chef Streaming"}</h2>

      <div className="card-list" ref={cardsRef}>
        {videos.length === 0 ? (
          <div style={{ color: "#fff", padding: 20 }}>Nenhum vídeo encontrado.</div>
        ) : (
          videos.map((video, idx) => {
            const vidId = video?.id?.videoId || (video?.id?.kind === "youtube#video" && video.id);
            const thumb = video?.snippet?.thumbnails?.medium?.url || "";
            const txt = video?.snippet?.title || "Sem título";
            return (
              <div className="card" key={vidId || idx} onClick={() => openVideo(video)}>
                <img src={thumb} alt={txt} />
                <p>{txt}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TittleCardsYoutube;
