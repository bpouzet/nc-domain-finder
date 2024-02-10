import * as NavigationBar from "expo-navigation-bar";
import React, {FC, useEffect} from 'react' ;
import { Provider as PaperProvider } from 'react-native-paper' ;
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client' ;
import { StatusBar } from 'expo-status-bar' ;
import { Try } from 'expo-router/build/views/Try' ;
import {Platform, View} from 'react-native' ;

import { CombinedDarkTheme, CombinedDefaultTheme } from '@config/theme' ;
import { persister, queryClient } from '@helpers/query' ;
import ErrorAppBoundary from '@components/ErrorAppBoundary' ;
import useColorScheme from '@hooks/useColorScheme' ;

const IsAndroid = Platform.OS === 'android' ;

type Props = {
  children: JSX.Element
}

const AppRoot: FC<Props> = ({ children }) => {

  const colorScheme = useColorScheme() ;

  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme ;

  useEffect(() => {

    if(IsAndroid) {
      void NavigationBar.setBackgroundColorAsync(theme.colors.elevation.level2) ;
      void NavigationBar.setButtonStyleAsync(theme.dark ? 'light' : 'dark') ;
    }
  }, [ theme ]) ;

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
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} hidden={false} />
      </PaperProvider>
    </PersistQueryClientProvider>
  ) ;

} ;

export default AppRoot ;
