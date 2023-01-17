import { Text } from 'react-native-paper' ;
import { useTranslation } from 'react-i18next' ;

import SafeView from '@components/SafeView' ;

export default function Profile() {
  const { t } = useTranslation() ;

  return (
    <SafeView>
      <Text>{t('profile')}</Text>
    </SafeView>
  ) ;

}
