import { Stack } from 'expo-router' ;
import { ThemeProvider } from '@react-navigation/native' ;

import { CombinedDarkTheme, CombinedDefaultTheme } from '@config/theme' ;
import useColorScheme from '@hooks/useColorScheme' ;

export default function RootLayout() {
  const colorScheme = useColorScheme() ;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  ) ;
}
