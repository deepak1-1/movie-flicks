import { useState, useEffect } from 'react'

import { fetchDataFromApi } from '../utils/api'

const useFetch = url => {
   const [data, setData] = useState(null)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)

   useEffect(() => {
      setLoading(true)
      setError(null)
      setData(null)

      fetchDataFromApi(url)
         .then(res => {
            if (res.error) {
               throw Error(res.error.message)
            }
            setLoading(false)
            setData(res.data)
         })
         .catch(err => {
            setLoading(false)
            setError('Something Went wrong')
         })
   }, [url])

   return { data, error, loading }
}

export default useFetch
