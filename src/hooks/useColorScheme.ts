import { useColorScheme as _useColorScheme } from 'react-native' ;
import useSettingsStore from '@hooks/useSettingsStore' ;

export default function useColorScheme() {
  const themeStore = useSettingsStore(
    (state) => state.theme
  ) ;

  const systemTheme = _useColorScheme() ?? 'light' ;

  // Return the appropriate theme without causing side effects
  return themeStore === 'default' ? systemTheme : themeStore ;
}
