import { Dialog, Portal, RadioButton, Text, TouchableRipple } from 'react-native-paper' ;
import { StyleSheet, View } from 'react-native' ;
import { FC } from 'react' ;
import { useTranslation } from 'react-i18next' ;

type Props = {
  visible: boolean;
  close: () => void;
};

const DialogLanguage: FC<Props> = ({ close, visible }) => {
  const { t, i18n } = useTranslation() ;

  const languageStore = i18n.language ;

  const onLanguageChange = (newLanguage: string) => {
    void i18n.changeLanguage(newLanguage) ;
    close() ;
  } ;

  const renderLanguages = () => {
    const languages = i18n.options.supportedLngs ;

    if( languages ) {
      return languages.map( el => {
        // remove cimode
        if( el !== 'cimode') {

          // TODO Do better
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const translate = t(`languages.${el}`) as string ;

          return (
            <TouchableRipple key={el} onPress={() => onLanguageChange(el)}>
              <View style={styles.row}>
                <View pointerEvents="none">
                  <RadioButton
                    value={el}
                    status={languageStore === el ? 'checked' : 'unchecked'}
                  />
                </View>
                <Text variant='bodyLarge' style={styles.text}>{translate}</Text>
              </View>
            </TouchableRipple>
          ) ;
        }
        return null ;
      }) ;
    }
    return null ;
  } ;

  return (
    <Portal>
      <Dialog onDismiss={close} visible={visible}>
        <Dialog.Title>{t('settings.language.title')}</Dialog.Title>
        <View>
          {renderLanguages()}
        </View>
        <Dialog.Actions>{null}</Dialog.Actions>
      </Dialog>
    </Portal>
  ) ;
} ;

export default DialogLanguage ;

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
