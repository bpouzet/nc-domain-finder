import { FlexAlignType, View } from 'react-native' ;
import { Image } from 'expo-image' ;

const FAVICONS_URL = 'https://icons.duckduckgo.com/ip3/' ;

// Style from Paper
interface Style {
  marginLeft?: number;
  marginRight?: number;
  marginVertical?: number;
  alignSelf?: FlexAlignType;
}
const getFavicon = (name: string, extension: string) => (props: {
  color: string;
  style: Style;
}) => {
  const uri = FAVICONS_URL + name + extension + '.ico' ;
  return (
    <View style={[ props.style, { justifyContent: 'center' } ]}>
      <Image
        source={{ uri }}
        style={{ height: 20, width: 20 }}
        contentFit='contain'
      />
    </View>

  ) ;
} ;


export default getFavicon ;
