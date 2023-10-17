import { create } from 'zustand'

export const useHome = create(set => ({
   url: {},
   genres: {},
   setApiConfiguration: data =>
      set(state => ({ url: data, genres: state.genres })),
   setGenres: data => set(state => ({ url: state.url, genres: data }))
}))
