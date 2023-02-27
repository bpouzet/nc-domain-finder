import Animated, {
  SlideInDown,
} from 'react-native-reanimated' ;
import { List, Modal, Portal, useTheme } from 'react-native-paper' ;
import {
  StyleSheet,
  View,
} from 'react-native' ;
import { useTranslation } from 'react-i18next' ;

type Props = {
  isConnected: boolean
}

const styles = StyleSheet.create({
  viewAnimated: {
    width: '100%',
  },
  viewContainer: {
    padding: 10,
  },
}) ;

export default function ConnectionModal({ isConnected } : Props) {

  const { t } = useTranslation() ;

  const theme = useTheme() ;

  return (
    <Portal>
      <Modal
        visible={!isConnected}
        dismissable={false}
        style={{ backgroundColor: '#00000099' }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Animated.View
          entering={SlideInDown.duration(500)}
          style={{
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            minHeight: 100,
            width: '100%',
          }}
        >
          <View style={styles.viewContainer}>
            <List.Item
              title={t('modals.connection.title')}
              description={t('modals.connection.description')}
              left={props => <List.Icon {...props} icon='signal-off' />}
            />
          </View>
        </Animated.View>
      </Modal>
    </Portal>
  ) ;
}
