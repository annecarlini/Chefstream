import { useParams, useNavigate } from "react-router-dom";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="player-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Voltar
      </button>

      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
