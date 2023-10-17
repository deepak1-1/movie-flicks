import { useState } from 'react'

import { ContentWrapper } from '../../../styled'
import SwitchTabs from '../../../components/switchTabs/SwitchTabs'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {
   const [queryEndPoint, setQueryEndPoint] = useState('day')

   const onTabChange = current => {
      setQueryEndPoint(current.toLowerCase())
   }

   const { data, loading } = useFetch(`/trending/all/${queryEndPoint}`)

   return (
      <div className="carouselSection">
         <ContentWrapper className="contentWrapper">
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
         </ContentWrapper>
         <Carousel data={data?.results} loading={loading} />
      </div>
   )
}

export default Trending
