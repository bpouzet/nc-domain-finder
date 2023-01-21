import React, { FC } from 'react' ;
import { SafeAreaView } from 'react-native-safe-area-context' ;
import { useTheme } from 'react-native-paper' ;

type Props = {
  children: React.ReactNode
}
const SafeView: FC<Props> = ({ children }) => {
  const theme = useTheme() ;

  return (
    <SafeAreaView style={{
      backgroundColor: theme.colors.background,
      flex: 1,
      padding: 10,
    }}>
      { children }
    </SafeAreaView>
  ) ;
} ;

export default SafeView ;
