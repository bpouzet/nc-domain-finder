import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper' ;
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native' ;

import { dark } from '@config/dark' ;
import { light } from '@config/light' ;

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
  reactNavigationLight: NavigationDefaultTheme,
}) ;

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    ...light.colors,
  },
} ;

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    ...dark.colors,
  },
} ;

export { CombinedDarkTheme, CombinedDefaultTheme } ;

