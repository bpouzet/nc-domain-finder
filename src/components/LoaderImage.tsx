import { FC, useState } from 'react' ;
import FastImage, { ImageStyle, ResizeMode, Source } from 'react-native-fast-image' ;
import { ImageRequireSource, StyleProp, View, ViewStyle } from 'react-native' ;
import { LinearGradient } from 'expo-linear-gradient' ;
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder' ;

type Props = {
  resizeMode?: ResizeMode;
  shimmerStyle?: StyleProp<ViewStyle>;
  source?: Source | ImageRequireSource;
  style?: StyleProp<ImageStyle>;
}

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient) ;

const LoaderImage:FC<Props> = ({ resizeMode, shimmerStyle, source, style }) => {

  const [ loading, setLoading ] = useState(false) ;

  return (
    <View style={shimmerStyle} >
      <ShimmerPlaceholder
        style={{
          height: '100%',
          position: 'absolute',
          width: '100%',
          zIndex: 1,
        }}
        visible={!loading}
      />
      <FastImage
        source={source}
        style={style}
        resizeMode={resizeMode}
        onLoadEnd={() => setLoading(false)}
        onLoadStart={() => setLoading(true)}
      />
    </View>
  ) ;
} ;

export default LoaderImage ;
