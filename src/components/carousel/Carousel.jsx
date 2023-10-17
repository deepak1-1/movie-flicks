import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons'

import CircleRating from '../circleRating/CircleRating'
import Genres from '../genres/Genres'
import { useHome } from '../../store/store'
import { ContentWrapper } from '../../styled'
import Img from '../lazyLoadImage/Img'
import PosterFallback from '../../assets/no-poster.png'
import './styles.scss'

const Carousel = ({ data, loading, queryEndPoint, title }) => {
   const navigate = useNavigate()
   const url = useHome(state => state.url)
   const carouselContainer = useRef()

   const navigation = direction => {
      const container = carouselContainer.current
      const scrollAmount =
         direction === 'left'
            ? container.scrollLeft - (container.offsetWidth + 20)
            : container.scrollLeft + (container.offsetWidth + 20)
      container.scrollTo({
         left: scrollAmount,
         behavior: 'smooth'
      })
   }

   const skItem = () => {
      return (
         <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
               <div className="title  skeleton"></div>
               <div className="date  skeleton"></div>
            </div>
         </div>
      )
   }

   return (
      <div className="carousel">
         <ContentWrapper className="contentWrapper">
            {title && <div className="carouselTitle">{title}</div>}
            <LeftCircleFilled
               className="carouselLeftNav arrow"
               onClick={() => navigation('left')}
            />
            <RightCircleFilled
               className="carouselRightNav arrow"
               onClick={() => navigation('right')}
            />
            {loading ? (
               <div className="loadingSkeleton">
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
               </div>
            ) : (
               <div className="carouselItems" ref={carouselContainer}>
                  {data?.map(item => {
                     const posterUrl = item.poster_path
                        ? url.image + item.poster_path
                        : PosterFallback
                     return (
                        <div
                           key={item.id}
                           className="carouselItem"
                           onClick={() =>
                              navigate(
                                 `/${
                                    item.media_type
                                       ? item.media_type
                                       : queryEndPoint
                                 }/${item.id}`
                              )
                           }
                        >
                           <div className="posterBlock">
                              <Img src={posterUrl} />
                              <CircleRating
                                 rating={item.vote_average.toFixed(1)}
                              />
                              <Genres data={item.genre_ids.slice(0, 2)} />
                           </div>
                           <div className="textBlock">
                              <span className="title">
                                 {item?.title || item.name}
                              </span>
                              <span className="date">
                                 {dayjs(item.release_date).format(
                                    'MMM D, YYYY'
                                 )}
                              </span>
                           </div>
                        </div>
                     )
                  })}
               </div>
            )}
         </ContentWrapper>
      </div>
   )
}

export default Carousel
