import * as Font from 'expo-font' ;
import * as Sentry from '@sentry/react-native' ;
import { KeyboardAvoidingView, View } from 'react-native' ;
import { KeyboardProvider } from 'react-native-keyboard-controller' ;
import { PaperProvider } from 'react-native-paper' ;
import { SystemBars } from 'react-native-edge-to-edge' ;
import { ThemeProvider } from '@react-navigation/native' ;
import { isRunningInExpoGo } from 'expo' ;
import { useSafeAreaInsets } from 'react-native-safe-area-context' ;
import React, { useCallback, useEffect, useMemo, useState } from 'react' ;
import { Slot, SplashScreen, useNavigationContainerRef } from 'expo-router' ;
import Constants from 'expo-constants' ;
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons' ;
import RelativeTime from 'dayjs/plugin/relativeTime' ;
import Utc from 'dayjs/plugin/utc' ;
import dayjs from 'dayjs' ;

dayjs.extend(RelativeTime) ;
dayjs.extend(Utc) ;
import 'dayjs/locale/fr' ;

import { CombinedDarkTheme, CombinedDefaultTheme } from '@config/theme' ;
import AppRoot from '@components/AppRoot' ;
import ConnectionModal from '@components/modals/ConnectionModal' ;
import useColorScheme from '@hooks/useColorScheme' ;
import useIsConnected from '@hooks/useIsConnected' ;

import { MyExpoConfig } from '@customTypes/expoConfig' ;

import '../i18n' ;

void SplashScreen.preventAutoHideAsync() ;

// Construct a new integration instance. This is needed to communicate between the integration and React
const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
}) ;

const isDev = process.env.APP_ENV === 'development' ;

// Init Sentry
Sentry.init({
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  dsn: (Constants.expoConfig as MyExpoConfig).extra.sentry.dsn,
  enableNative: !isDev,
  enableNativeFramesTracking: !isRunningInExpoGo(), // Tracks slow and frozen frames in the application
  enabled: !isDev,
  environment: process.env.APP_ENV,
  integrations: [ navigationIntegration ],
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
    return colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme ;
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
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }} onLayout={onLayoutRootView}>
      <PaperProvider theme={theme}>
        <ThemeProvider value={theme}>
          <KeyboardProvider>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={-TabBarHeightIOS-insets.bottom}
              style={{ flex: 1 }}
            >
              <AppRoot>
                <Slot />
              </AppRoot>
              <ConnectionModal isConnected={isConnected} />
            </KeyboardAvoidingView>
          </KeyboardProvider>
          <SystemBars style={theme.dark ? 'light' : 'dark'} />
        </ThemeProvider>
      </PaperProvider>
    </View>
  ) ;
}

export default Sentry.wrap(RootLayout) ;

export { ErrorBoundary } from '@components/ErrorBoundary' ;
