import { Dialog, Portal, RadioButton } from 'react-native-paper' ;
import { FC } from 'react' ;
import { StyleSheet } from 'react-native' ;
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

  const onThemeChange = (newTheme: string) => {
    setTheme(newTheme as Theme) ;
    close() ;
  } ;

  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible}>
        <Dialog.Title>{t('settings.theme.title')}</Dialog.Title>
        <RadioButton.Group onValueChange={onThemeChange} value={themeStore}>
          <RadioButton.Item
            position='leading'
            value='default'
            accessibilityLabel={t('settings.theme.default')}
            label={t('settings.theme.default')}
            labelStyle={styles.text}
          />
          <RadioButton.Item
            position='leading'
            value='light'
            accessibilityLabel={t('settings.theme.light')}
            label={t('settings.theme.light')}
            labelStyle={styles.text}
          />
          <RadioButton.Item
            position='leading'
            value='dark'
            accessibilityLabel={t('settings.theme.dark')}
            label={t('settings.theme.dark')}
            labelStyle={styles.text}
          />
        </RadioButton.Group>
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
    textAlign: 'left',
  },
}) ;
