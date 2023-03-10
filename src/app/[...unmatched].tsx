import { useTranslation } from 'react-i18next' ;

import ErrorView from '@components/views/ErrorView' ;

export default function Unmatched() {

  const { t } = useTranslation() ;

  return (
    <ErrorView
      description={t('unmatched.description')}
      icon='routes'
      title={t('unmatched.title')}
    />
  ) ;
}
