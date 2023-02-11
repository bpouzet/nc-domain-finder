import * as Sentry from 'sentry-expo' ;
import React, { FC } from 'react' ;
import Constants from 'expo-constants' ;
import { Provider as PaperProvider } from 'react-native-paper' ;
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client' ;
//import { RootContainer } from 'expo-router' ;
import { StatusBar } from 'expo-status-bar' ;
import { Try } from 'expo-router/build/views/Try' ;
import { View } from 'react-native' ;

import { CombinedDarkTheme, CombinedDefaultTheme } from '@config/theme' ;
import { persister, queryClient } from '@helpers/query' ;
import ErrorAppBoundary from '@components/ErrorAppBoundary' ;
import { MyExpoConfig } from '@customTypes/expoConfig' ;
import useCachedResources from '@hooks/useCachedResources' ;
import useColorScheme from '@hooks/useColorScheme' ;

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
const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation() ;

// Init Sentry
Sentry.init({
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  dsn: (Constants.expoConfig as MyExpoConfig).extra.sentry.dsn,
  enableInExpoDevelopment: false,
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      // ...
    }),
  ],
  tracesSampleRate: 1.0,
}) ;

type Props = {
  children: JSX.Element
}
const AppRoot: FC<Props> = ({ children }) => {

  //const navigationRef = RootContainer.useRef() ;

  const isLoadingComplete = useCachedResources() ;

  const colorScheme = useColorScheme() ;

  if (!isLoadingComplete) {
    return null ;
  } else {
    // if(navigationRef?.isReady) {
    //   // Register the navigation container with the instrumentation
    //   routingInstrumentation.registerNavigationContainer(navigationRef) ;
    // }
    const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme ;

    return (
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <PaperProvider theme={theme}>
          <View
            style={{
              backgroundColor: theme.colors.background,
              flex: 1,
            }}
          >
            <Try catch={ErrorAppBoundary}>
              { children }
            </Try>
          </View>
          <StatusBar hidden={false} />
        </PaperProvider>
      </PersistQueryClientProvider>
    ) ;
  }

} ;

export default AppRoot ;
