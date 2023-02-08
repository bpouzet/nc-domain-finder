import * as NavigationBar from 'expo-navigation-bar' ;
import { Platform } from 'react-native' ;
import { Stack } from 'expo-router' ;
import { ThemeProvider } from '@react-navigation/native' ;
import { useEffect } from 'react' ;
import { useTheme } from 'react-native-paper' ;

import { CombinedDarkTheme, CombinedDefaultTheme } from '@config/theme' ;
import useColorScheme from '@hooks/useColorScheme' ;

const isAndroid = Platform.OS === 'android' ;

export default function RootLayout() {
  const colorScheme = useColorScheme() ;
  const theme = useTheme() ;

  useEffect(() => {
    if(isAndroid) {
      void NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2) ;
      void NavigationBar.setButtonStyleAsync(theme.dark ? 'light' : 'dark') ;
    }
  }, [ theme ]) ;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  ) ;
}
