import { ContentWrapper } from '../../../styled'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const UpcomingMovies = () => {
   const { data, loading } = useFetch(`/movie/upcoming`)

   return (
      <div className="carouselSection">
         <ContentWrapper className="contentWrapper">
            <span className="carouselTitle">Upcoming Movies</span>
         </ContentWrapper>
         <Carousel
            queryEndPoint={'movie'}
            data={data?.results}
            loading={loading}
         />
      </div>
   )
}

export default UpcomingMovies
