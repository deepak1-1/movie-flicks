import { useState } from 'react'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'

import { useHome } from '../../../store/store'
import useFetch from '../../../hooks/useFetch'
import Genres from '../../../components/genres/Genres'
import { PlayIcon } from '../Playbutton'
import CircleRating from '../../../components/circleRating/CircleRating'
import Img from '../../../components/lazyLoadImage/Img'
import PosterFallback from '../../../assets/no-poster.png'
import { ContentWrapper } from '../../../styled'
import VideoPopup from '../../../components/videoPopup/VideoPopup'
import './styles.scss'

const DetailsBanner = ({ video, crew }) => {
   const params = useParams()
   const url = useHome(state => state.url)
   const { data, loading } = useFetch(`/${params.mediaType}/${params.id}`)

   const [show, setShow] = useState(false)
   const [videoId, setVideoId] = useState(null)

   const _genres = data?.genres?.map(genre => genre.id)
   const director = crew?.filter(f => f.job === 'Director')
   const writer = crew?.filter(
      f =>
         f.job === 'Screenplay' ||
         f.job === 'Story Artist' ||
         f.job === 'Writer'
   )

   const toHoursAndMinutes = totalMinutes => {
      const hours = Math.floor(totalMinutes / 60)
      const minutes = totalMinutes % 60
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
   }

   return (
      <div className="detailsBanner">
         {!loading ? (
            <>
               {!!data && (
                  <>
                     <div>
                        <div className="backdrop-img">
                           <Img src={url.image + data.backdrop_path} />
                        </div>
                        <div className="opacity-layer"></div>
                        <ContentWrapper className="contentWrapper">
                           <div className="content">
                              <div className="left">
                                 {data.poster_path ? (
                                    <Img
                                       className="posterImg"
                                       src={url.image + data.poster_path}
                                    />
                                 ) : (
                                    <Img
                                       className="posterImg"
                                       src={PosterFallback}
                                    />
                                 )}
                              </div>
                              <div className="right">
                                 <div className="title">{`${
                                    data.name || data.title
                                 } (${dayjs(data.release_date).format(
                                    'YYYY'
                                 )})`}</div>
                                 <div className="subtitle">{data.tagline}</div>
                                 <Genres
                                    data={data.genres.map(genre => genre.id)}
                                 />
                                 <div className="row">
                                    <CircleRating
                                       rating={data.vote_average.toFixed(1)}
                                    />
                                    <div
                                       className="playbtn"
                                       onClick={() => {
                                          setShow(true)
                                          setVideoId(video.key)
                                       }}
                                    >
                                       <PlayIcon />
                                       <span className="text">
                                          Watch Trailer
                                       </span>
                                    </div>
                                 </div>
                                 <div className="overview">
                                    <div className="heading">Overview</div>
                                    <div className="description">
                                       {data.overview}
                                    </div>
                                 </div>
                                 <div className="info">
                                    {data.status && (
                                       <div className="infoItem">
                                          <span className="text bold">
                                             Status:{' '}
                                          </span>
                                          <span className="text">
                                             {data.status}
                                          </span>
                                       </div>
                                    )}
                                    {data.release_date && (
                                       <div className="infoItem">
                                          <span className="text bold">
                                             Release Date:{' '}
                                          </span>
                                          <span className="text">
                                             {dayjs(data.release_date).format(
                                                'MMM D, YYYY'
                                             )}
                                          </span>
                                       </div>
                                    )}
                                    {data.runtime && (
                                       <div className="infoItem">
                                          <span className="text bold">
                                             Run Time:{' '}
                                          </span>
                                          <span className="text">
                                             {toHoursAndMinutes(data.runtime)}
                                          </span>
                                       </div>
                                    )}
                                 </div>

                                 {director?.length > 0 && (
                                    <div className="info">
                                       <span className="text bold">
                                          Director:{' '}
                                       </span>
                                       <span className="text">
                                          {director.map((eachDirector, i) => (
                                             <span key={i}>
                                                {eachDirector.name}
                                                {director.length - 1 !== i &&
                                                   ', '}
                                             </span>
                                          ))}
                                       </span>
                                    </div>
                                 )}
                                 {writer?.length > 0 && (
                                    <div className="info">
                                       <span className="text bold">
                                          Writer:{' '}
                                       </span>
                                       <span className="text">
                                          {writer.map((eachWriter, i) => (
                                             <span key={i}>
                                                {eachWriter.name}
                                                {writer.length - 1 !== i &&
                                                   ', '}
                                             </span>
                                          ))}
                                       </span>
                                    </div>
                                 )}
                                 {data?.created_by?.length > 0 && (
                                    <div className="info">
                                       <span className="text bold">
                                          Creator:{' '}
                                       </span>
                                       <span className="text">
                                          {data.created_by.map(
                                             (eachCreator, i) => (
                                                <span key={i}>
                                                   {eachCreator.name}
                                                   {data.created_by.length -
                                                      1 !==
                                                      i && ', '}
                                                </span>
                                             )
                                          )}
                                       </span>
                                    </div>
                                 )}
                              </div>
                           </div>
                           <VideoPopup
                              show={show}
                              setShow={setShow}
                              videoId={videoId}
                              setVideoId={setVideoId}
                           />
                        </ContentWrapper>
                     </div>
                  </>
               )}
            </>
         ) : (
            <div className="detailsBannerSkeleton">
               <ContentWrapper className="contentWrapper">
                  <div className="left skeleton"></div>
                  <div className="right">
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                     <div className="row skeleton"></div>
                  </div>
               </ContentWrapper>
            </div>
         )}
      </div>
   )
}

export default DetailsBanner
