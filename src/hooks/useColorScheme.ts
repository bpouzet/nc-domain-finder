import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native' ;
import useSettingsStore from '@hooks/useSettingsStore' ;

// The useColorScheme value is always either light or dark, but the built-in
// type suggests that it can be null. This will not happen in practice, so this
// makes it a bit easier to work with.
export default function useColorScheme(): NonNullable<ColorSchemeName> {
  const themeStore = useSettingsStore(state => state.theme) ;

  const systemTheme = _useColorScheme() as NonNullable<ColorSchemeName> ;

  if( themeStore === 'default') {
    return systemTheme ;
  }
  return themeStore ;
}
