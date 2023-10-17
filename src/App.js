import { lazy, useEffect, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { fetchDataFromApi } from './utils/api'
import { useHome } from './store/store'

const Home = lazy(() => import('./pages/home/Home'))
const Details = lazy(() => import('./pages/details/Details'))
const SearchResult = lazy(() => import('./pages/searchResult/SearchResult'))
const PageNotFound = lazy(() => import('./pages/404/PageNotFound'))
const Explore = lazy(() => import('./pages/explore/Explore'))
const RootLayout = lazy(() => import('./RootLayout'))

const router = createBrowserRouter([
   {
      path: '/',
      errorElement: (
         <Suspense fallback={<>Loading...</>}>
            <PageNotFound />
         </Suspense>
      ),
      element: (
         <Suspense fallback={<>Loading...</>}>
            <RootLayout />
         </Suspense>
      ),
      children: [
         {
            path: '/',
            element: (
               <Suspense fallback={<>Loading...</>}>
                  <Home />
               </Suspense>
            )
         },
         {
            path: '/:mediaType/:id',
            element: (
               <Suspense fallback={<>Loading...</>}>
                  <Details />
               </Suspense>
            )
         },
         {
            path: '/search/:query',
            element: (
               <Suspense fallback={<>Loading...</>}>
                  <SearchResult />
               </Suspense>
            )
         },
         {
            path: '/explore/:mediaType',
            element: (
               <Suspense fallback={<>Loading...</>}>
                  <Explore />
               </Suspense>
            )
         }
      ]
   }
])

const App = () => {
   const { setApiConfiguration, setGenres } = useHome(state => state)

   useEffect(() => {
      fetchDataFromApi('/configuration')
         .then(res => {
            const url = {
               image: res.data.images.secure_base_url + 'original'
            }
            setApiConfiguration(url)
         })
         .catch(err => console.log(err))
      genresCall()
   }, [])

   const genresCall = async () => {
      const allGenres = {}
      const endPoints = ['tv', 'movie']
      const promises = endPoints.map(eachEndPoint =>
         fetchDataFromApi(`/genre/${eachEndPoint}/list`)
      )
      Promise.all(promises).then(values => {
         values.map(({ data }) => {
            data.genres.map(genre => {
               allGenres[genre.id] = genre.name
            })
         })
         setGenres(allGenres)
      })
   }

   return <RouterProvider router={router} />
}

export default App
