import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const TMBD_TOKEN = process.env.REACT_APP_TMBD_TOKEN

const headers = {
   Authorization: `bearer ${TMBD_TOKEN}`,
   'Content-Type': 'application/json'
}

export const fetchDataFromApi = async (url, params) => {
   try {
      const { data } = await axios.get(BASE_URL + url, {
         headers,
         params: {
            api_key: 'a530002b206bec6ddb4503bc6ddea81f',
            ...params
         }
      })
      return { data: data }
   } catch (error) {
      return { error: error }
   }
}
