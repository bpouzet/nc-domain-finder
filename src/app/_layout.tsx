import * as NavigationBar from 'expo-navigation-bar' ;
import { KeyboardAvoidingView, Platform } from 'react-native' ;
import { Stack } from 'expo-router' ;
import { ThemeProvider } from '@react-navigation/native' ;
import { useEffect } from 'react' ;
import { useSafeAreaInsets } from 'react-native-safe-area-context' ;
import { useTheme } from 'react-native-paper' ;

import { CombinedDarkTheme, CombinedDefaultTheme } from '@config/theme' ;
import ConnectionModal from '@components/modals/ConnectionModal' ;
import useAppUpdate from '@hooks/useAppUpdate' ;
import useColorScheme from '@hooks/useColorScheme' ;
import useIsConnected from '@hooks/useIsConnected' ;

const IsAndroid = Platform.OS === 'android' ;

// TODO Do better
const TabBarHeightIOS = 80 ;

export default function RootLayout() {
  const colorScheme = useColorScheme() ;
  const theme = useTheme() ;

  const insets = useSafeAreaInsets() ;

  useAppUpdate() ;

  const { isConnected } = useIsConnected() ;

  useEffect(() => {
    if(IsAndroid) {
      void NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2) ;
      void NavigationBar.setButtonStyleAsync(theme.dark ? 'light' : 'dark') ;
    }
  }, [ theme ]) ;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}>
      <KeyboardAvoidingView
        behavior={IsAndroid ? 'height' : 'padding'}
        keyboardVerticalOffset={IsAndroid ? 0 : -TabBarHeightIOS-insets.bottom}
        style={{ flex: 1 }}
      >
        <Stack screenOptions={{ headerShown: false }} />
        <ConnectionModal isConnected={isConnected} />
      </KeyboardAvoidingView>
    </ThemeProvider>
  ) ;
}
