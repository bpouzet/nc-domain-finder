import { type FC, useState } from 'react' ;
import { Image, type ImageContentFit, type ImageSource, type ImageStyle } from 'expo-image' ;
import { type StyleProp, View, type ViewStyle } from 'react-native' ;
import { LinearGradient } from 'expo-linear-gradient' ;
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder' ;

type Props = {
  contentFit?: ImageContentFit;
  shimmerStyle?: StyleProp<ViewStyle>;
  source?: ImageSource | string | number | ImageSource[] | string[] | null;
  style?: ImageStyle | ImageStyle[];
}

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient) ;

const LoaderImage:FC<Props> = ({ contentFit, shimmerStyle, source, style }) => {

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
        width={400}
        shimmerWidthPercent={0.8}
        visible={!loading}
      />
      <Image
        source={source}
        style={style}
        contentFit={contentFit}
        contentPosition='top'
        onLoadEnd={() => setLoading(false)}
        onLoadStart={() => setLoading(true)}
      />
    </View>
  ) ;
} ;

export default LoaderImage ;
