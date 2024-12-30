import { Appearance, useColorScheme as _useColorScheme } from 'react-native' ;
import { useEffect } from 'react' ;
import useSettingsStore from '@hooks/useSettingsStore' ;

export default function useColorScheme() {
  const themeStore = useSettingsStore(
    (state) => state.theme
  ) ;
  const systemTheme = _useColorScheme() || 'default' ;

  useEffect(() => {
    if (themeStore === 'light' || themeStore === 'dark') {
      Appearance.setColorScheme(themeStore) ;
    } else {
      Appearance.setColorScheme(null) ;
    }
  }, [ themeStore ]) ;

  // Return the appropriate theme without causing side effects
  return themeStore === 'default' ? systemTheme : themeStore ;
}
