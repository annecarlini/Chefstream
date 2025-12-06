import './Home.css'
import NavBar from '../../components/Navbar/Navbar'
import banner from '../../assets/japanese-banner.jpg'
import { Play, Info } from 'lucide-react';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer'
import TitleCardsYoutube from "../../components/TitleCards/TitleCardsYoutube";



const Home = () => {
  return (
    <div className="home">
      <NavBar />
      <div className="main-banner">
        <img src={banner} alt="" className='banner-img'/>
        <div className="main-banner-caption">
          <h2 className='h2-title'>Tour gastrônomico nas ruas de Tokyo</h2>
          <p>Das barracas escondidas nos becos iluminados por lanternas vermelhas aos balcões minimalistas de sushi feitos à mão, cada parada revela um pedaço da alma japonesa.</p>
          <div className="main-bts">
            <button className='btn'>
              <Play size={30} strokeWidth={2} color='black'/>
              Play
            </button>
            <button className='btn dark-btn'>
              <Info size={30} strokeWidth={2} color='white'/>
              Mais info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCardsYoutube title="Tour gastronômico na Rua" query="street food japan" />
        <TitleCardsYoutube title="Cada país uma cultura" query="culinaria do mundo" />
        <TitleCardsYoutube title="Reality show: Os melhores aqui!" query="culinary reality show" />
        <TitleCardsYoutube title="Comidas requintadas" query="fine dining recipes" />
      </div>
      <Footer />
    </div>
  )
}

export default Home