import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import { fetchDataFromApi } from '../../utils/api'
import Spinner from '../../components/spinner/Spinner'
import { ContentWrapper } from '../../styled'
import MovieCard from '../../components/movieCard/MovieCard'
import NoResult from '../../assets/no-results.png'

import './styles.scss'

const SearchResult = () => {
   const [data, setData] = useState([])
   const [pagination, setPagination] = useState({
      page: 1,
      totalPages: 1
   })
   const [loading, setLoading] = useState(false)
   const { query } = useParams()

   useEffect(() => {
      setPagination(prev => ({ ...prev, page: 1 }))
      fetchInitialData()
   }, [query])

   const fetchInitialData = () => {
      setLoading(true)
      fetchDataFromApi(
         `/search/multi?query=${query}&page=${pagination.page}`
      ).then(response => {
         console.log('Response: ', response)
         setData(response?.data?.results || [])
         setPagination(prev => ({
            page: prev.page + 1,
            totalPages: response?.data?.total_pages
         }))
         setLoading(false)
      })
   }

   const fetchNextData = () => {
      setLoading(true)
      fetchDataFromApi(
         `/search/multi?query=${query}&page=${pagination.page}`
      ).then(response => {
         console.log('Response: ', response)
         setData([...data, ...(response?.data?.results || [])])
         setPagination(prev => ({
            page: prev.page + 1,
            totalPages: response?.data?.total_pages
         }))
         setLoading(false)
      })
   }

   useEffect(() => {
      fetchInitialData()
   }, [query])

   return (
      <div className="searchResultsPage">
         {loading && <Spinner initial={true} />}
         {!loading && (
            <ContentWrapper>
               {data.length > 0 ? (
                  <>
                     <div className="pageTitle">
                        {`Search ${
                           data.length > 1 ? 'results' : 'result'
                        } of '${query}'`}
                     </div>
                     <InfiniteScroll
                        className="content"
                        dataLength={data?.length || []}
                        next={fetchNextData}
                        hasMore={pagination.page <= pagination.totalPages}
                        loader={<Spinner />}
                     >
                        {data.map((item, index) => {
                           if (item.media_type === 'person') return
                           return (
                              <MovieCard
                                 key={index}
                                 data={item}
                                 fromSearch={true}
                              />
                           )
                        })}
                     </InfiniteScroll>
                  </>
               ) : (
                  <span className="resultNotFound">No movies found</span>
               )}
            </ContentWrapper>
         )}
      </div>
   )
}

export default SearchResult
