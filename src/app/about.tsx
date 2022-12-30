import { useTranslation } from 'react-i18next' ;
import { Button, Text, View } from 'react-native' ;

export default function Profile() {
  const { t, i18n } = useTranslation() ;

  return (
    <View style={{ flex: 1 }}>
      <Text>{t('about')}</Text>

      <Button
        title='English'
        onPress={() => {
          void i18n.changeLanguage('en') ;
        }}
      />
      <Button
        title='Français'
        onPress={() => void i18n.changeLanguage('fr')}
      />
    </View>
  ) ;

}
