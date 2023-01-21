import { Button, Text, useTheme } from 'react-native-paper' ;
import { useTranslation } from 'react-i18next' ;

import SafeView from '@components/SafeView' ;
export default function About() {
  const { t, i18n } = useTranslation() ;
  const theme = useTheme() ;

  return (
    <SafeView>
      <Text>{t('about')}</Text>

      <Button
        mode='contained'
        onPress={() => {
          void i18n.changeLanguage('en') ;
        }}
        dark={theme.dark}
      >English</Button>
      <Button
        mode='contained'
        onPress={() => void i18n.changeLanguage('fr')}
        dark={theme.dark}
      >Français</Button>
    </SafeView>
  ) ;

}
