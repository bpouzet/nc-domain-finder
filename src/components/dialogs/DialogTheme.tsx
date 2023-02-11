import { Dialog, Portal, RadioButton, Text, TouchableRipple } from 'react-native-paper' ;
import { StyleSheet, View } from 'react-native' ;
import { FC } from 'react' ;
import { useTranslation } from 'react-i18next' ;

import useSettingsStore, { Theme } from '@hooks/useSettingsStore' ;

type Props = {
  visible: boolean;
  close: () => void;
};

const DialogTheme: FC<Props> = ({ close, visible }) => {
  const { t } = useTranslation() ;

  const themeStore = useSettingsStore(state => state.theme) ;
  const setTheme = useSettingsStore(state => state.setTheme) ;

  const onThemeChange = (newTheme: Theme) => {
    setTheme(newTheme) ;
    close() ;
  } ;

  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible}>
        <Dialog.Title>{t('settings.theme.title')}</Dialog.Title>
        <View>
          <TouchableRipple onPress={() => onThemeChange('default')}>
            <View style={styles.row}>
              <View pointerEvents="none">
                <RadioButton
                  value="default"
                  status={themeStore === 'default' ? 'checked' : 'unchecked'}
                />
              </View>
              <Text variant='bodyLarge' style={styles.text}>{t('settings.theme.default')}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => onThemeChange('light')}>
            <View style={styles.row}>
              <View pointerEvents="none">
                <RadioButton
                  value="light"
                  status={themeStore === 'light' ? 'checked' : 'unchecked'}
                />
              </View>
              <Text variant='bodyLarge' style={styles.text}>{t('settings.theme.light')}</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => onThemeChange('dark')}>
            <View style={styles.row}>
              <View pointerEvents="none">
                <RadioButton
                  value="dark"
                  status={themeStore === 'dark' ? 'checked' : 'unchecked'}
                />
              </View>
              <Text variant='bodyLarge' style={styles.text}>{t('settings.theme.dark')}</Text>
            </View>
          </TouchableRipple>
        </View>
        <Dialog.Actions>{null}</Dialog.Actions>
      </Dialog>
    </Portal>
  ) ;
} ;

export default DialogTheme ;

const styles = StyleSheet.create({
  container: {
    maxHeight: 170,
    paddingHorizontal: 0,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
}) ;
