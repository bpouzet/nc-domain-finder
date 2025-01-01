import { createJSONStorage, persist } from 'zustand/middleware' ;
import AsyncStorage from 'expo-sqlite/kv-store' ;
import { create } from 'zustand' ;

const SETTINGS_KEY = 'settings' ;

export type Theme = 'default' | 'dark' | 'light' ;

export interface SettingsState {
  theme: Theme
  version: string
}

interface Actions {
  setTheme: (theme: Theme) => void
  setVersion: (version: string) => void
}

const initialState: SettingsState = {
  theme: 'default',
  version: '',
} ;

const useSettingsStore = create<SettingsState & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setTheme: (theme) => set({ theme }),
      setVersion: (version) => set({ version }),
    }),
    {
      name: SETTINGS_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
) ;

export default useSettingsStore ;
