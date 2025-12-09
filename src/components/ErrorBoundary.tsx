import * as Sentry from '@sentry/react-native' ;
import { Avatar, Button, Text, useTheme } from 'react-native-paper' ;
import { type FC, useEffect } from 'react' ;
import type { ErrorBoundaryProps } from 'expo-router' ;
import { View } from 'react-native' ;
import { useTranslation } from 'react-i18next' ;

import SafeView from '@components/SafeView' ;

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ error, retry }) => {

  const theme = useTheme() ;
  const { t } = useTranslation() ;

  useEffect(() => {
    // Capture the error with additional context
    Sentry.withScope((scope) => {
      scope.setTag('errorBoundary', true) ;
      scope.setLevel('error') ;
      scope.setContext('errorInfo', {
        componentStack: error.stack,
        errorMessage: error.message,
        errorName: error.name,
      }) ;
      Sentry.captureException(error) ;
    }) ;
  }, [ error ]) ;

  return (
    <SafeView>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          gap: 10,
          justifyContent: 'center',
        }}
      >
        <Avatar.Icon
          icon='bug'
          style={{ backgroundColor: theme.colors.error }}
        />
        <Text variant='headlineLarge'>{t('errorBoundary.title')}</Text>
        <Text>{error.message}</Text>
        <Button onPress={retry}>{t('actions.tryAgain')}</Button>
      </View>
    </SafeView>
  ) ;
} ;

export { ErrorBoundary } ;
