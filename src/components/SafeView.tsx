import React, { FC } from 'react' ;
import { SafeAreaView } from 'react-native-safe-area-context' ;

type Props = {
  children: React.ReactNode
}
const SafeView: FC<Props> = ({ children }) => {

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
    }}>
      { children }
    </SafeAreaView>
  ) ;
} ;

export default SafeView ;
