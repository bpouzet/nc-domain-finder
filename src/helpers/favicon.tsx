import { FlexAlignType, View } from 'react-native' ;
import FastImage from 'react-native-fast-image' ;

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
      <FastImage
        source={{ uri }}
        style={{ height: 20, width: 20 }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>

  ) ;
} ;


export default getFavicon ;
