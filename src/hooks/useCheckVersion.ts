import * as Application from 'expo-application' ;
import { Image } from 'expo-image' ;
import { useEffect } from 'react' ;

import useSettingsStore from '@hooks/useSettingsStore' ;

const useCheckVersion = () => {

  useEffect(() => {
    void (async () => {
      const version = useSettingsStore.getState().version ;
      const setVersion = useSettingsStore.getState().setVersion ;

      if( version ) return ;
      // check new version
      const appVersion = Application.nativeApplicationVersion ;

      if ( appVersion && (appVersion !== version) ) {
        setVersion(appVersion) ;

        // clear cache
        await Image.clearDiskCache() ;
      }
    })() ;
  }, []) ;
} ;

export default useCheckVersion ;
