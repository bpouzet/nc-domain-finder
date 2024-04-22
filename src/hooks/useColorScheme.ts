import {Appearance, useColorScheme as _useColorScheme} from 'react-native' ;
import useSettingsStore from '@hooks/useSettingsStore' ;

export default function useColorScheme() {
  const themeStore = useSettingsStore(state => state.theme) ;

  const systemTheme = _useColorScheme() || 'default' ;

  if (themeStore === 'light' || themeStore === 'dark') {
    Appearance.setColorScheme(themeStore)
  }
  Appearance.setColorScheme(null)

  if( themeStore === 'default') {
    return systemTheme ;
  }
}
