import { Avatar, Button, Text, useTheme } from 'react-native-paper' ;
import { type GestureResponderEvent, View } from 'react-native' ;
import type { IconSource } from 'react-native-paper/lib/typescript/components/Icon' ;
import { useRouter } from 'expo-router' ;
import { useTranslation } from 'react-i18next' ;

import SafeView from '@components/SafeView' ;


type Props = {
  buttonTitle?: string,
  description: string,
  icon: IconSource,
  onPress?: ((e: GestureResponderEvent) => void),
  title: string,
}

export default function ErrorView({ buttonTitle, description, icon, onPress, title }: Props) {
  const router = useRouter() ;
  const theme = useTheme() ;
  const { t } = useTranslation() ;

  if( !buttonTitle ) {
    buttonTitle = t('actions.goBack') ;
  }

  if( !onPress ) {
    onPress = () => router.replace('/') ;
  }

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
          icon={icon}
          style={{ backgroundColor: theme.colors.error }}
        />
        <Text variant='headlineLarge'>{title}</Text>
        <Text>{description}</Text>
        <Button onPress={onPress}>{buttonTitle}</Button>
      </View>
    </SafeView>
  ) ;
}
