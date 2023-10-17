import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './styles.scss'
import useFetch from '../../../hooks/useFetch'
import { useHome } from '../../../store/store'
import Img from '../../../components/lazyLoadImage/Img'
import { ContentWrapper } from '../../../styled'
import TypingAnimation from '../../../components/TypingAnimation'

const Banner = () => {
   const navigate = useNavigate()
   const url = useHome(state => state.url)

   const [background, setBackground] = useState('')
   const [searched, setSearched] = useState('')

   const { data, loading, error } = useFetch('/movie/upcoming')

   useEffect(() => {
      setBackground(
         url.image +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
      )
   }, [data])

   const searchHandler = e => {
      if (e.key === 'Enter' && searched.length > 0) {
         navigate(`/search/${searched}`)
      }
   }

   return (
      <div className="banner">
         {!loading && !error && (
            <div className="backdrop-img">
               <Img src={background} />
            </div>
         )}
         <div className="opacity-layer"></div>
         <ContentWrapper>
            <div className="bannerContent">
               <TypingAnimation text="Welcome" className="title" speed="500" />
               <TypingAnimation
                  text="Millions of movies, TV shows and people to discover. Explore
                  now"
                  className="subTitle"
               />
               <div className="searchInput">
                  <input
                     placeholder="Search for a movie or TV show....."
                     onKeyUp={searchHandler}
                     onChange={e => setSearched(e.target.value)}
                  />
                  <button>Search</button>
               </div>
            </div>
         </ContentWrapper>
      </div>
   )
}

export default Banner
