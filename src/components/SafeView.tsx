import React, { type FC } from 'react' ;
import { Platform } from 'react-native' ;
import { SafeAreaView } from 'react-native-safe-area-context' ;
import { useTheme } from 'react-native-paper' ;

type Props = {
  children: React.ReactNode
}

const isIOSBelow26 = Platform.OS === 'ios' && parseInt(Platform.Version, 10) < 26 ;

const SafeView: FC<Props> = ({ children }) => {

  const theme = useTheme() ;

  return (
    <SafeAreaView edges={[ 'top' ]} style={{
      backgroundColor: theme.colors.background,
      flex: 1,
      paddingBottom: isIOSBelow26 ? 85 : undefined,
      paddingHorizontal: 10,
      paddingVertical: 5,
    }}>
      { children }
    </SafeAreaView>
  ) ;
} ;

export default SafeView ;
