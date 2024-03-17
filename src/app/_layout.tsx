import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, View } from 'react-native' ;
import { Slot } from 'expo-router' ;
import { ThemeProvider } from '@react-navigation/native' ;
import React, { useEffect } from 'react' ;
import { PaperProvider } from "react-native-paper";
import { useSafeAreaInsets } from 'react-native-safe-area-context' ;
import * as Sentry from '@sentry/react-native' ;
import Constants from 'expo-constants' ;
import * as SplashScreen from 'expo-splash-screen'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import Utc from 'dayjs/plugin/utc'

dayjs.extend(RelativeTime)
dayjs.extend(Utc)
import 'dayjs/locale/fr'

import AppRoot from "@components/AppRoot";
import { CombinedDarkTheme, CombinedDefaultTheme } from '@config/theme' ;
import ConnectionModal from '@components/modals/ConnectionModal' ;
import useColorScheme from '@hooks/useColorScheme' ;
import useIsConnected from '@hooks/useIsConnected' ;

import { MyExpoConfig } from '@customTypes/expoConfig' ;

import '../i18n'

export { ErrorBoundary } from '@components/ErrorBoundary'

SplashScreen.preventAutoHideAsync()

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation() ;

const isDev = process.env.APP_ENV === 'development'

// Init Sentry
Sentry.init({
  enabled: !isDev,
  enableNative: !isDev,
  environment: process.env.APP_ENV,
  debug: !isDev, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  dsn: (Constants.expoConfig as MyExpoConfig).extra.sentry.dsn,
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      // ...
    }),
  ],
  tracesSampleRate: 1.0,
}) ;

const IsAndroid = Platform.OS === 'android' ;

// TODO Do better
const TabBarHeightIOS = 80 ;

const start = Date.now()

function RootLayout() {

  const [fontsLoaded, fontError] = useFonts({
    ...MaterialCommunityIcons.font,
  })

  const { isConnected } = useIsConnected() ;
  const colorScheme = useColorScheme() ;

  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme ;

  const insets = useSafeAreaInsets() ;

  useEffect(() => {
    if (fontError) throw fontError
  }, [fontError])

  useEffect(() => {
    if ( fontsLoaded ) {
      const now = Date.now()
      console.log(`Rendered in ${now - start}ms`)

      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useEffect(() => {

    if(IsAndroid) {
      void NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2) ;
      void NavigationBar.setButtonStyleAsync(theme.dark ? 'light' : 'dark') ;
    }
  }, [ theme ]) ;

  // Prevent rendering until the font has loaded or an error was returned
  if ( !fontsLoaded ) {
    return <View style={{ backgroundColor: theme.colors.background, flex: 1 }}></View>
  }

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <PaperProvider theme={theme}>
        <ThemeProvider value={theme}>
          <KeyboardAvoidingView
            behavior={IsAndroid ? 'height' : 'padding'}
            keyboardVerticalOffset={IsAndroid ? 0 : -TabBarHeightIOS-insets.bottom}
            style={{ flex: 1 }}
          >
            <AppRoot>
              <Slot />
            </AppRoot>
            <ConnectionModal isConnected={isConnected} />
          </KeyboardAvoidingView>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} hidden={false} />
        </ThemeProvider>
      </PaperProvider>
    </View>
  )
}

export default Sentry.wrap(RootLayout)
