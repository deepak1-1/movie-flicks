import { useHome } from '../../store/store'
import './styles.scss'

const Genres = ({ data }) => {
   const genres = useHome(state => state.genres)

   return (
      <div className="genres">
         {data.map(genre => {
            if (!genres[genre]) return
            return (
               <div className="genre" key={genre.id}>
                  {genres[genre]}
               </div>
            )
         })}
      </div>
   )
}

export default Genres
