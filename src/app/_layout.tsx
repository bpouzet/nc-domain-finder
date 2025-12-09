import * as Font from 'expo-font' ;
import * as NavigationBar from 'expo-navigation-bar' ;
import * as Sentry from '@sentry/react-native' ;
import { KeyboardAvoidingView, Platform, View } from 'react-native' ;
import { SplashScreen, Stack, useNavigationContainerRef } from 'expo-router' ;
import { useCallback, useEffect, useMemo, useState } from 'react' ;
import Constants from 'expo-constants' ;
import { KeyboardProvider } from 'react-native-keyboard-controller' ;
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons' ;
import { PaperProvider } from 'react-native-paper' ;
import RelativeTime from 'dayjs/plugin/relativeTime' ;
import { StatusBar } from 'expo-status-bar' ;
import { ThemeProvider } from '@react-navigation/native' ;
import Utc from 'dayjs/plugin/utc' ;
import dayjs from 'dayjs' ;
import { isRunningInExpoGo } from 'expo' ;
import { useSafeAreaInsets } from 'react-native-safe-area-context' ;

import 'dayjs/locale/fr' ;
import '../i18n' ;
import { CombinedDarkTheme, CombinedDefaultTheme } from '@config/theme' ;
import AppRoot from '@components/AppRoot' ;
import ConnectionModal from '@components/modals/ConnectionModal' ;
import type { MyExpoConfig } from '@customTypes/expoConfig' ;
import useColorScheme from '@hooks/useColorScheme' ;
import useIsConnected from '@hooks/useIsConnected' ;
dayjs.extend(RelativeTime) ;
dayjs.extend(Utc) ;

void SplashScreen.preventAutoHideAsync() ;

// Construct a new integration instance. This is needed to communicate between the integration and React
const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
}) ;

const isDev = process.env.APP_ENV === 'development' ;

// Init Sentry
Sentry.init({
  beforeSend(event) {
    // Filter out development errors if needed
    if (isDev) {
      console.log('Sentry event (dev):', event) ;
    }
    return event ;
  },
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  dsn: (Constants.expoConfig as MyExpoConfig).extra.sentry.dsn,
  enableNative: !isDev,
  enableNativeFramesTracking: !isRunningInExpoGo(), // Tracks slow and frozen frames in the application
  enabled: !isDev,
  environment: process.env.APP_ENV,
  integrations: [ navigationIntegration ],
  profilesSampleRate: 1.0, // Profile 100% of transactions in production
  sendDefaultPii: true, // Include user context and additional data
  tracesSampleRate: 1.0,
}) ;

// TODO Do better
const TabBarHeightIOS = 80 ;

function RootLayout() {
  const ref = useNavigationContainerRef() ;

  const { isConnected } = useIsConnected() ;
  const colorScheme = useColorScheme() ;
  const insets = useSafeAreaInsets() ;

  const theme = useMemo(() => {
    const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme ;
    if ( Platform.OS === 'android' ) {
    // set navigation and status bars
      NavigationBar.setStyle(theme.dark ? 'dark' : 'light') ;
    }
    return theme ;
  }, [ colorScheme ] ) ;

  const [ appIsReady, setAppIsReady ] = useState<boolean>(false) ;

  const onLayoutRootView = useCallback(() => {
    if ( appIsReady ) {
      SplashScreen.hide() ;
    }
  }, [ appIsReady ]) ;

  useEffect(() => {
    void (async () => {
      try {
        await Font.loadAsync(MaterialCommunityIcons.font) ;
      } catch (e) {
        console.warn(e) ;
      } finally {
        setAppIsReady(true) ;
      }
    })() ;
  }, []) ;

  useEffect(() => {
    if (ref?.current) {
      navigationIntegration.registerNavigationContainer(ref) ;
    }
  }, [ ref ]) ;

  // Prevent rendering until the font has loaded or an error was returned
  if ( !appIsReady ) {
    return null ;
  }

  return (
    <View style={{ backgroundColor: theme.colors.surfaceVariant, flex: 1 }} onLayout={onLayoutRootView}>
      <PaperProvider theme={theme}>
        <ThemeProvider value={theme}>
          <KeyboardProvider>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={-TabBarHeightIOS-insets.bottom}
              style={{ flex: 1 }}
            >
              <AppRoot>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name='(tabs)' />
                  <Stack.Screen name='(zShared)' />
                </Stack>
              </AppRoot>
              <ConnectionModal isConnected={isConnected} />
              <StatusBar style={theme.dark ? 'light' : 'dark'} translucent />
            </KeyboardAvoidingView>
          </KeyboardProvider>
        </ThemeProvider>
      </PaperProvider>
    </View>
  ) ;
}

export default Sentry.wrap(RootLayout) ;

export { ErrorBoundary } from '@components/ErrorBoundary' ;
