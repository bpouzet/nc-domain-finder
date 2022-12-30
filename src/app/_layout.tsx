import Colors from '@config/Colors' ;
import { FontAwesome } from '@expo/vector-icons' ;
import useColorScheme from '@hooks/useColorScheme' ;
import { DarkTheme, DefaultTheme } from '@react-navigation/native' ;
import { RootContainer, Tabs } from 'expo-router' ;

import useCachedResources from '@hooks/useCachedResources' ;
import { StatusBar } from 'expo-status-bar' ;
import * as React from 'react' ;
import { useTranslation } from 'react-i18next' ;
import { SafeAreaProvider } from 'react-native-safe-area-context' ;
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client' ;
import * as Sentry from 'sentry-expo' ;
import { MyExpoConfig } from '../types' ;
import { persister, queryClient } from '../helpers/query' ;
import Constants from 'expo-constants' ;

// polyfill
import 'intl-pluralrules' ;

import '../i18n' ;

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.Native.ReactNavigationInstrumentation() ;

Sentry.init({
  dsn: (Constants.expoConfig as MyExpoConfig).extra.sentry.dsn,
  tracesSampleRate: 1.0,
  enableInExpoDevelopment: false,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      // ...
    }),
  ],
}) ;

export default function RootLayout() {

  const navigationRef = RootContainer.useRef() ;

  const isLoadingComplete = useCachedResources() ;
  const colorScheme = useColorScheme() ;

  const { t } = useTranslation() ;

  if (!isLoadingComplete) {
    return null ;
  } else {

    if(navigationRef?.isReady) {
      // Register the navigation container with the instrumentation
      routingInstrumentation.registerNavigationContainer(navigationRef) ;
    }
    return (
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <SafeAreaProvider>
          <RootContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} />
          <Tabs
            initialRouteName='index'
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: Colors[colorScheme].tint,
            }}
            detachInactiveScreens={false}
          >
            <Tabs.Screen
              name='index'
              options={{
                href: '/',
                title: t('search'),
                tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
              }}
            />
            <Tabs.Screen
              name='profile'
              options={{
                href: '/profile',
                title: t('profile'),
                tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
              }}
            />
            <Tabs.Screen
              name='about'
              options={{
                href: '/about',
                title: t('about'),
                tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
              }}
            />
            <Tabs.Screen
              name='_sitemap'
              options={{
                href: null
              }}
            />
            <Tabs.Screen
              name='[...404]'
              options={{
                href: null
              }}
            />
          </Tabs>
          <StatusBar hidden={false} />
        </SafeAreaProvider>
      </PersistQueryClientProvider>
    ) ;
  }
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} /> ;
}
