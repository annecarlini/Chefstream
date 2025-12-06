import { useRef, useEffect } from 'react'
import cards_data from '../../assets/cards/Cards_data'
import "./TitleCards.css";


const TittleCards = ({title, category}) => {


  const cardsRef = useRef();
  const handleWheel = (event)=>{
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{
    cardsRef.current.addEventListener('wheel', handleWheel);
  }, [])



  return (
    <div className="title-cards">
      <h2 className='sub-title'>{title?title:"Popular no Chef Streaming"}</h2>

        <div className="card-list" ref={cardsRef}>
          {cards_data.map((card, index)=>{
            return <div className="card" key={index}>
              <img src={card.image} alt="" />
              <p>{card.name}</p>
            </div>
          })} 
        </div>
    </div>
  )
}

export default TittleCards