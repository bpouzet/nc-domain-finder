import { Fragment } from 'react' ;
import { LinearGradient } from 'expo-linear-gradient' ;
import { View } from 'react-native' ;
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder' ;

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient) ;

type Props = {
  items?: number
}

const TitleHeight = 20 ;
const TitleWidth = 150 ;

const DescriptionHeight = 20 ;
const DescriptionWidth = 250 ;

const Item = () => (
  <>
    <ShimmerPlaceholder shimmerWidthPercent={0.5} width={TitleWidth} height={TitleHeight} />
    <View style={{ height: 4 }}/>
    <ShimmerPlaceholder shimmerWidthPercent={0.4} width={DescriptionWidth} height={DescriptionHeight} />
  </>
) ;

export default function LoaderItems({ items = 1 }: Props) {
  return (
    <View style={{ flex: 1, padding: 15 }}>
      { Array(items).fill(1).map((el, i) => (
        <Fragment key={i}>
          <Item />
          { (i<(items-1) ? <View style={{ height: 20 }} /> : null)}
        </Fragment>
      ))}
    </View>
  ) ;
}
