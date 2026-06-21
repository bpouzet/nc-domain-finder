import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme, configureFonts } from 'react-native-paper' ;
import { DarkTheme as ReactNavigationDarkTheme, DefaultTheme as ReactNavigationDefaultTheme } from 'expo-router/react-navigation' ;

import { dark } from '@config/dark' ;
import { light } from '@config/light' ;

import type { MD3Type } from 'react-native-paper/lib/typescript/types' ;

// expo-router/react-navigation types theme colors as ColorValue, while react-native-paper's
// adaptNavigationTheme expects string-colored NavigationTheme. The themes are runtime-compatible.
type NavigationThemeInput = Parameters<typeof adaptNavigationTheme>[0]['reactNavigationLight'] ;

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: ReactNavigationDarkTheme as unknown as NavigationThemeInput,
  reactNavigationLight: ReactNavigationDefaultTheme as unknown as NavigationThemeInput,
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

