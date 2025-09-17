import * as Application from 'expo-application' ;
import * as Updates from 'expo-updates' ;
import { Appbar, List, useTheme } from 'react-native-paper' ;
import { ScrollView, StyleSheet, View } from 'react-native' ;
import { useState } from 'react' ;
import { useTranslation } from 'react-i18next' ;

import DialogLanguage from '@components/dialogs/DialogLanguage' ;
import DialogTheme from '@components/dialogs/DialogTheme' ;
import useSettingsStore from '@hooks/useSettingsStore' ;

export default function Settings() {
  const { t, i18n } = useTranslation() ;
  const theme = useTheme() ;
  const themeStore = useSettingsStore(state => state.theme) ;

  const language = i18n.language === 'fr' ? t('languages.fr') : t('languages.en') ;

  const [ visibleLanguageModal, setVisibleLanguageModal ] = useState<boolean>(false) ;
  const [ visibleThemeModal, setVisibleThemeModal ] = useState<boolean>(false) ;

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={t('settings.title')} />
      </Appbar.Header>

      <ScrollView>
        <List.Section>
          <List.Subheader>{t('settings.appearance')}</List.Subheader>
          <View style={styles.items}>
            <List.Item
              title={t('settings.theme.title')}
              description={t(`settings.theme.${themeStore}`)}
              onPress={() => setVisibleThemeModal(true)}
            />
            <List.Item
              title={t('settings.language.title')}
              description={language}
              onPress={() => setVisibleLanguageModal(true)}
            />
          </View>
          <List.Subheader>Application</List.Subheader>
          <View style={styles.items}>
            <List.Item
              title="Version"
              description={Application.nativeApplicationVersion}
            />
            <List.Item
              title="Build"
              description={Application.nativeBuildVersion}
            />
            <List.Item
              title="Channel"
              description={Updates.channel || 'default'}
            />
            <List.Item
              title="Runtime version"
              description={Updates.runtimeVersion}
            />
          </View>
        </List.Section>
      </ScrollView>

      <DialogLanguage visible={visibleLanguageModal} close={() => setVisibleLanguageModal(false)} />
      <DialogTheme visible={visibleThemeModal} close={() => setVisibleThemeModal(false)} />
    </View>
  ) ;

}

const styles = StyleSheet.create({
  items: {
    paddingLeft: 20,
  },
}) ;
