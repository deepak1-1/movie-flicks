import './styles.scss'
import Banner from './banner/Banner'
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
import UpcomingMovies from './upcomingMovies/UpcomingMovies'

const Home = () => {
   return (
      <div className="homePage">
         <Banner />
         <Trending />
         <UpcomingMovies />
         <Popular />
         <TopRated />
      </div>
   )
}

export default Home
