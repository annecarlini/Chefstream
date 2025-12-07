import './Admin.css'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminHeader from '../../components/Admin/AdminHeader'
import StatCard from '../../components/Admin/StatCard'
import ContentTable from '../../components/Admin/ContentTable'
import { Users, PlayCircle, DollarSign } from 'lucide-react'
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase'
import { fetchYoutubeVideos } from '../../services/youtube'

const Admin = () => {
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalVideos, setTotalVideos] = useState(0)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar total de usuários do Firebase
        const usersSnapshot = await getDocs(collection(db, 'users'))
        setTotalUsers(usersSnapshot.size)

        // Buscar vídeos do YouTube (combinando todas as queries da home)
        const queries = [
          'street food japan',
          'culinaria do mundo',
          'culinary reality show',
          'fine dining recipes'
        ]

        let allVideos = []
        for (const query of queries) {
          const vids = await fetchYoutubeVideos(query)
          allVideos = [...allVideos, ...vids]
        }

        setVideos(allVideos)
        setTotalVideos(allVideos.length)
        setLoading(false)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const stats = [
    {
      title: "Assinantes",
      value: loading ? "..." : totalUsers.toString(),
      change: "+12.5%",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Total de Vídeos",
      value: loading ? "..." : totalVideos.toString(),
      change: "+23.1%",
      changeType: "positive",
      icon: PlayCircle,
    },
    {
      title: "Receita",
      value: "R$ 98K",
      change: "+8.3%",
      changeType: "positive",
      icon: DollarSign,
    },
  ]

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} delay={index * 100} />
            ))}
          </div>

          {/* Content Table */}
          <ContentTable videos={videos} loading={loading} />
        </main>
      </div>
    </div>
  )
}

export default Admin
