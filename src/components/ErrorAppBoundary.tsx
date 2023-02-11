import * as Sentry from 'sentry-expo' ;
import { Button, Text } from 'react-native-paper' ;
import { FC, useEffect } from 'react' ;
import { ErrorBoundaryProps } from 'expo-router' ;

import SafeView from '@components/SafeView' ;

const ErrorAppBoundary: FC<ErrorBoundaryProps> = ({ error, retry }) => {

  useEffect(() => {
    Sentry.Native.captureException(error) ;
  }, [ error ]) ;

  return (
    <SafeView>
      <Text>{error.message}</Text>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onPress={retry}>Try Again?</Button>
    </SafeView>
  ) ;
} ;

export default ErrorAppBoundary ;
