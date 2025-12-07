import './AdminContents.css'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminHeader from '../../components/Admin/AdminHeader'
import ContentTable from '../../components/Admin/ContentTable'
import { useState, useEffect } from 'react'
import { fetchYoutubeVideos } from '../../services/youtube'
import { Filter } from 'lucide-react'

const AdminContents = () => {
  const [allVideos, setAllVideos] = useState([])
  const [filteredVideos, setFilteredVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'street food japan', label: 'Street Food Japão' },
    { value: 'culinaria do mundo', label: 'Culinária do Mundo' },
    { value: 'culinary reality show', label: 'Reality Shows' },
    { value: 'fine dining recipes', label: 'Fine Dining' }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredVideos(allVideos)
    } else {
      const filtered = allVideos.filter(video => 
        video.category === selectedCategory
      )
      setFilteredVideos(filtered)
    }
  }, [selectedCategory, allVideos])

  const fetchData = async () => {
    try {
      const queries = [
        'street food japan',
        'culinaria do mundo',
        'culinary reality show',
        'fine dining recipes'
      ]

      let videosWithCategory = []
      for (const query of queries) {
        const vids = await fetchYoutubeVideos(query)
        const vidsWithCat = vids.map(v => ({ ...v, category: query }))
        videosWithCategory = [...videosWithCategory, ...vidsWithCat]
      }

      setAllVideos(videosWithCategory)
      setFilteredVideos(videosWithCategory)
      setLoading(false)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      setLoading(false)
    }
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <div className="page-header">
            <div>
              <h1>Gerenciar Conteúdos</h1>
              <p>{filteredVideos.length} vídeos encontrados</p>
            </div>
            <div className="filter-box">
              <Filter size={18} />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ContentTable videos={filteredVideos} loading={loading} />
        </main>
      </div>
    </div>
  )
}

export default AdminContents
