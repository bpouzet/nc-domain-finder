import * as Application from 'expo-application' ;
import { Image } from 'expo-image' ;
import { useEffect } from 'react' ;

import useSettingsStore from '@hooks/useSettingsStore' ;

const useCheckVersion = () => {
  const version = useSettingsStore((state) => state.version) ;
  const setVersion = useSettingsStore((state) => state.setVersion) ;

  useEffect(() => {
    void (async () => {
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
