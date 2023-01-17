import { Button, Text } from 'react-native-paper' ;
import { ErrorBoundaryProps } from 'expo-router' ;
import { FC } from 'react' ;

import SafeView from '@components/SafeView' ;

const ErrorAppBoundary: FC<ErrorBoundaryProps> = (props) => {

  return (
    <SafeView>
      <Text>{props.error.message}</Text>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onPress={props.retry}>Try Again?</Button>
    </SafeView>
  ) ;
} ;

export default ErrorAppBoundary ;
