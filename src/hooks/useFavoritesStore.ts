import { createJSONStorage, persist } from 'zustand/middleware' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;
import { create } from 'zustand' ;

import type { DomainList } from '../schemas/DomainListSchema' ;

const FAVORITES_KEY = 'favorites' ;

interface FavoritesState {
  addFavorite: (domain: DomainList) => void,
  favorites: DomainList[],
  isFavorite: (domain: DomainList) => boolean,
  removeFavorite: (domain: DomainList) => void
}

const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      addFavorite: (domain) => {
        set(state => {
          return {
            ...state,
            favorites: [ ...state.favorites, domain ].sort((a, b) => a.name.localeCompare(b.name)),
          } ;
        }) ;
      },
      favorites: [],
      isFavorite: (domain) => {
        return get().favorites.findIndex(el => el.name === domain.name) !== -1 ;
      },
      removeFavorite: (domain) => {
        set(state => {
          return {
            ...state,
            favorites: state.favorites.filter(el => el.name !== domain.name),
          } ;
        }) ;
      },
    }),
    {
      name: FAVORITES_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )) ;

export default useFavoritesStore ;
