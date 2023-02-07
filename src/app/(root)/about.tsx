import { Button, Text } from 'react-native-paper' ;
import { useTranslation } from 'react-i18next' ;

import SafeView from '@components/SafeView' ;
export default function About() {
  const { t, i18n } = useTranslation() ;

  return (
    <SafeView>
      <Text>{t('about.title')}</Text>

      <Button
        mode='contained'
        onPress={() => {
          void i18n.changeLanguage('en') ;
        }}
      >English</Button>
      <Button
        mode='contained'
        onPress={() => void i18n.changeLanguage('fr')}
      >Français</Button>
    </SafeView>
  ) ;

}
