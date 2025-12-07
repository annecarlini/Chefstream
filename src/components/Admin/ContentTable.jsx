import './ContentTable.css'
import { MoreHorizontal, Eye, Edit, Trash2, Play } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const statusConfig = {
  published: { label: "Publicado", className: "status-published" },
  draft: { label: "Rascunho", className: "status-draft" },
  scheduled: { label: "Agendado", className: "status-scheduled" },
}

const ContentTable = ({ videos = [], loading = false }) => {
  const [openMenu, setOpenMenu] = useState(null)
  const navigate = useNavigate()

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id)
  }

  // Converter vídeos do YouTube para formato da tabela
  const contents = videos && videos.length > 0 
    ? videos.slice(0, 10).map((video) => {
        const videoId = video?.id?.videoId || video?.id
        return {
          id: videoId,
          title: video?.snippet?.title || "Sem título",
          chef: video?.snippet?.channelTitle || "Canal desconhecido",
          category: "YouTube",
          views: Math.floor(Math.random() * 50000),
          status: "published",
          duration: "N/A",
          thumbnail: video?.snippet?.thumbnails?.medium?.url || ""
        }
      })
    : []

  // Debug: ver o que está vindo
  console.log('Videos recebidos:', videos.length)
  console.log('Contents gerados:', contents.length)

  const handleView = (videoId) => {
    navigate(`/player/${videoId}`)
  }

  return (
    <div className="content-table-container animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="table-header">
        <div>
          <h2 className="table-title">Conteúdos Recentes</h2>
          <p className="table-subtitle">Vídeos do YouTube na plataforma</p>
        </div>
        <button className="new-content-btn">
          <Play size={16} />
          Novo Conteúdo
        </button>
      </div>
      
      <div className="table-wrapper">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>
            Carregando vídeos...
          </div>
        ) : contents.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.6)' }}>
            Nenhum vídeo encontrado
          </div>
        ) : (
          <table className="content-table">
            <thead>
              <tr>
                <th>Conteúdo</th>
                <th>Canal</th>
                <th>Categoria</th>
                <th>Views</th>
                <th>Status</th>
                <th>Duração</th>
                <th className="text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((content) => (
                <tr key={content.id}>
                  <td>
                    <div className="content-info">
                      <img 
                        src={content.thumbnail} 
                        alt={content.title}
                        className="content-thumbnail"
                      />
                      <span className="content-title">{content.title}</span>
                    </div>
                  </td>
                  <td className="text-muted">{content.chef}</td>
                  <td>
                    <span className="category-badge">{content.category}</span>
                  </td>
                  <td className="text-bold">
                    {content.views.toLocaleString('pt-BR')}
                  </td>
                  <td>
                    <span className={`status-badge ${statusConfig[content.status].className}`}>
                      {statusConfig[content.status].label}
                    </span>
                  </td>
                  <td className="text-muted">{content.duration}</td>
                  <td className="text-right">
                    <div className="actions-menu">
                      <button 
                        className="action-btn"
                        onClick={() => toggleMenu(content.id)}
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      {openMenu === content.id && (
                        <div className="dropdown-menu">
                          <button 
                            className="dropdown-item"
                            onClick={() => handleView(content.id)}
                          >
                            <Eye size={16} /> Visualizar
                          </button>
                          <button className="dropdown-item">
                            <Edit size={16} /> Editar
                          </button>
                          <button className="dropdown-item destructive">
                            <Trash2 size={16} /> Excluir
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ContentTable
