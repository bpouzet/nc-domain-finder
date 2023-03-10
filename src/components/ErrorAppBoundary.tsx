import * as Sentry from 'sentry-expo' ;
import { Avatar, Button, Text, useTheme } from 'react-native-paper' ;
import { FC, useEffect } from 'react' ;
import { ErrorBoundaryProps } from 'expo-router' ;
import { View } from 'react-native' ;
import { useTranslation } from 'react-i18next' ;

import SafeView from '@components/SafeView' ;

const ErrorAppBoundary: FC<ErrorBoundaryProps> = ({ error, retry }) => {

  const theme = useTheme() ;
  const { t } = useTranslation() ;

  useEffect(() => {
    Sentry.Native.captureException(error) ;
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
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button onPress={retry}>{t('actions.tryAgain')}</Button>
      </View>
    </SafeView>
  ) ;
} ;

export default ErrorAppBoundary ;
