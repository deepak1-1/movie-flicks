import { useState } from 'react'

import { ContentWrapper } from '../../../styled'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {
   const [queryEndPoint, setQueryEndPoint] = useState('movie')

   const onTabChange = current => {
      if (current === 'Movies') {
         setQueryEndPoint('movie')
      } else if (current === 'TV Shows') {
         setQueryEndPoint('tv')
      }
   }

   const { data, loading } = useFetch(`/${queryEndPoint}/top_rated`)

   return (
      <div className="carouselSection">
         <ContentWrapper className="contentWrapper">
            <span className="carouselTitle">Top Rated</span>
            <SwitchTabs
               data={['Movies', 'TV Shows']}
               onTabChange={onTabChange}
            />
         </ContentWrapper>
         <Carousel
            queryEndPoint={queryEndPoint}
            data={data?.results}
            loading={loading}
         />
      </div>
   )
}

export default TopRated
