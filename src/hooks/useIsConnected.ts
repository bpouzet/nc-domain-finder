import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo' ;
import { useEffect, useState } from 'react' ;
import useAppState from '@hooks/useAppState' ;

let unsubscribe: NetInfoSubscription ;

const useIsConnected = () => {

  const { appStateVisible } = useAppState() ;

  const [ isConnected, setIsConnect ] = useState<boolean>(true) ;

  useEffect( () => {

    if( appStateVisible === 'active' ) {
      unsubscribe = NetInfo.addEventListener(state => {
        setIsConnect(state.isConnected) ;
      }) ;
    } else {
      if( unsubscribe ) {
        unsubscribe() ;
      }
    }
  }, [ appStateVisible ]) ;

  return { isConnected } ;
} ;

export default useIsConnected ;
