import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme, configureFonts } from 'react-native-paper' ;
import { DarkTheme as ReactNavigationDarkTheme, DefaultTheme as ReactNavigationDefaultTheme } from '@react-navigation/native' ;

import { dark } from '@config/dark' ;
import { light } from '@config/light' ;

import type { MD3Type } from 'react-native-paper/lib/typescript/types' ;

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: ReactNavigationDarkTheme,
  reactNavigationLight: ReactNavigationDefaultTheme,
}) ;

const fontConfig: Partial<MD3Type> = {
  fontFamily: 'SpaceMono-Regular',
} as const ;

// Thèmes unifiés pour MD3 (compatible avec PaperProvider et ThemeProvider)
const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
    ...light.colors,
  },
  fonts: configureFonts({ config: fontConfig, isV3: true }),
} ;

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    ...dark.colors,
  },
  fonts: configureFonts({ config: fontConfig, isV3: true }),
} ;

export { CombinedDarkTheme, CombinedDefaultTheme } ;

