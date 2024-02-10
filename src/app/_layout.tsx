import AppRoot from "@components/AppRoot";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from "expo-font";
import { KeyboardAvoidingView, Platform, View } from 'react-native' ;
import { Slot, SplashScreen } from 'expo-router' ;
import { ThemeProvider } from '@react-navigation/native' ;
import { useCallback } from 'react' ;
import { useSafeAreaInsets } from 'react-native-safe-area-context' ;
import * as Sentry from '@sentry/react-native' ;
import Constants from 'expo-constants' ;

import { CombinedDarkTheme, CombinedDefaultTheme } from '@config/theme' ;
import ConnectionModal from '@components/modals/ConnectionModal' ;
import useAppUpdate from '@hooks/useAppUpdate' ;
import useColorScheme from '@hooks/useColorScheme' ;
import useIsConnected from '@hooks/useIsConnected' ;
import { MyExpoConfig } from '@customTypes/expoConfig' ;

// polyfills for Intl API
import '@formatjs/intl-getcanonicallocales/polyfill' ;
import '@formatjs/intl-locale/polyfill' ;
import '@formatjs/intl-pluralrules/polyfill' ;
import '@formatjs/intl-pluralrules/locale-data/en' ; // locale-data for en
import '@formatjs/intl-pluralrules/locale-data/fr' ; // locale-data for fr
import '@formatjs/intl-relativetimeformat/polyfill' ;
import '@formatjs/intl-numberformat/polyfill' ;
import '@formatjs/intl-numberformat/locale-data/en' ; // locale-data for en
import '@formatjs/intl-numberformat/locale-data/fr' ; // locale-data for fr
import '@formatjs/intl-relativetimeformat/locale-data/en' ; // locale-data for en
import '@formatjs/intl-relativetimeformat/locale-data/fr' ; // locale-data for fr
import '@formatjs/intl-datetimeformat/polyfill' ;
import '@formatjs/intl-datetimeformat/locale-data/en' ; // locale-data for en
import '@formatjs/intl-datetimeformat/locale-data/fr' ; // locale-data for fr
import '@formatjs/intl-datetimeformat/add-golden-tz' ; // Add ALL tz data

import '../i18n' ;

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

SplashScreen.preventAutoHideAsync()
const start = Date.now()

export default function RootLayout() {

  const [fontsLoaded, fontError] = useFonts({
    ...MaterialCommunityIcons.font,
  })

  const { isConnected } = useIsConnected() ;
  const colorScheme = useColorScheme() ;

  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme ;

  const insets = useSafeAreaInsets() ;

  useAppUpdate() ;

  const onLayoutRootView = useCallback(() => {
    if ( fontsLoaded || fontError !== null ) {
      const now = Date.now()
      console.log(`Rendered in ${now - start}ms`)

      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded || fontError) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider value={theme}>
        <KeyboardAvoidingView
          behavior={IsAndroid ? 'height' : 'padding'}
          keyboardVerticalOffset={IsAndroid ? 0 : -TabBarHeightIOS-insets.bottom}
          style={{ flex: 1 }}
        >
          <AppRoot>
            <Slot />
            <ConnectionModal isConnected={isConnected} />
          </AppRoot>
        </KeyboardAvoidingView>
      </ThemeProvider>
    </View>
  )
}
