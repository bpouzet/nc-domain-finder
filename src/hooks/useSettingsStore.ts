import { createJSONStorage, persist } from 'zustand/middleware' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;
import { create } from 'zustand' ;

const SETTINGS_KEY = 'settings' ;

export type Theme = 'default' | 'dark' | 'light' ;

export interface SettingsState {
  theme: Theme
}

interface Actions {
  setTheme: (theme: Theme) => void,
}

const initialState: SettingsState = {
  theme: 'default',
} ;

const useSettingsStore = create<SettingsState & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme: (theme) => {
        set( state => {
          return {
            ...state,
            theme,
          } ;
        }) ;
      },
    }),
    {
      name: SETTINGS_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
) ;

export default useSettingsStore ;
