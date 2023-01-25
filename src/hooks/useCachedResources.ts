import * as Font from 'expo-font' ;
import * as Sentry from 'sentry-expo' ;
import * as SplashScreen from 'expo-splash-screen' ;
import { useEffect, useState } from 'react' ;
import { FontAwesome } from '@expo/vector-icons' ;

import SpaceMono from '../assets/fonts/SpaceMono-Regular.ttf' ;

export default function useCachedResources() {
  const [ isLoadingComplete, setLoadingComplete ] = useState(false) ;

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await SplashScreen.preventAutoHideAsync() ;

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': SpaceMono,
        }) ;
      } catch (e) {
        Sentry.Native.captureException(e) ;
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
