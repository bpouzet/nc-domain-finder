import * as Font from 'expo-font' ;
import * as Sentry from '@sentry/react-native' ;
import * as SplashScreen from 'expo-splash-screen' ;
import { useEffect, useState } from 'react' ;
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons' ;

import useFavoritesStore from '@hooks/useFavoritesStore' ;

export default function useCachedResources() {
  const [ isLoadingComplete, setLoadingComplete ] = useState(false) ;

  // preload favorites
  useFavoritesStore(state => state.favorites) ;

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync() ;

        // Load fonts
        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
        }) ;
      } catch (e) {
        Sentry.captureException(e) ;
      } finally {
        setLoadingComplete(true) ;
        // expo router handle closing splashscreen
        //await SplashScreen.hideAsync() ;
      }
    }

    void loadResourcesAndDataAsync() ;
  }, []) ;

  return isLoadingComplete ;
}
