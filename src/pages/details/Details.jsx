import { useParams } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import DetailsBanner from './detailBanner/DetailBanner'
import Cast from './cast/Cast'
import VideosSection from './detailBanner/videosSection/videosSection'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

const Details = () => {
   const params = useParams()
   const { data, loading } = useFetch(
      `/${params.mediaType}/${params.id}/videos`
   )
   const { data: credData, loading: credLoading } = useFetch(
      `/${params.mediaType}/${params.id}/credits`
   )

   return (
      <>
         <DetailsBanner video={data?.results?.[0]} crew={credData?.crew} />
         <Cast data={credData?.cast} loading={credLoading} />
         <VideosSection data={data} loading={loading} />
         <Similar mediaType={params.mediaType} id={params.id} />
         <Recommendation mediaType={params.mediaType} id={params.id} />
      </>
   )
}

export default Details
