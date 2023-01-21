import * as Linking from 'expo-linking' ;
import { Appbar, FAB, List, useTheme } from 'react-native-paper' ;
import { ScrollView, View, useWindowDimensions } from 'react-native' ;
import { useRouter, useSearchParams } from 'expo-router' ;
import FastImage from 'react-native-fast-image' ;
import LoaderImage from '@components/LoaderImage' ;
import getFavicon from '@helpers/favicon' ;
import { useDomain } from '@helpers/query' ;
import { useSafeAreaInsets } from 'react-native-safe-area-context' ;
import { useTranslation } from 'react-i18next' ;

const THUMB_URL = 'https://image.thum.io/get/noanimate/http://' ;

const options = {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
} ;

export default function Name() {
  const { t } = useTranslation() ;
  const theme = useTheme() ;
  const router = useRouter() ;

  const { name, extension } = useSearchParams() ;

  const { top } = useSafeAreaInsets() ;
  const { height } = useWindowDimensions() ;

  const { data, isFetching } = useDomain(name, extension) ;

  const header = (40 / 100) * height ;

  const getDate = (date: string) => t('date', {
    formatParams: { val: options },
    val: new Date(date),
  }) ;

  const getProperOwner = (owner: string, ridet: string) => {
    const pos = owner.indexOf(ridet) ;
    if(pos !== -1) {
      return owner.slice(pos + ridet.length).trim() ;
    }
    return owner ;
  } ;

  const getRelativeTime = (num: number) => t('relateTime', { val: num }) ;

  const onPress = (name: string, extension: string) => () => void Linking.openURL('http://' + name + extension) ;

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={{ height: header }}>
        <Appbar.Header
          style={{
            backgroundColor: 'transparent',
            paddingHorizontal: 0,
            width: '100%',
          }}
        >
          <Appbar.BackAction
            style={{ backgroundColor: theme.colors.background, zIndex: 1 }}
            onPress={() => router.back()}
          />
          <LoaderImage
            source={{ uri: THUMB_URL + name + extension }}
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              flex: 1,
            }}
            resizeMode={FastImage.resizeMode.cover}
            shimmerStyle={{
              height: header,
              position: 'absolute',
              top: -top,
              width: '100%',
            }}
          />
        </Appbar.Header>
      </View>

      <List.Item
        title={name}
        description={extension}
        onPress={() => null}
        left={getFavicon(name, extension)}
        right={() => (
          <FAB icon="open-in-new" size='small' mode='flat' onPress={onPress(name, extension)} />
        )}
      />

      {data ? (
        <ScrollView style={{ flex: 1 }}>
          <List.Item title={t('domain.owner')} description={getProperOwner(data.beneficiaire, data.ridet)} />
          {data.ridet ? <List.Item title={t('domain.ridet')} description={data.ridet}/> : null}
          {(data.gestionnaire && data.gestionnaire !== 'AUCUN') ?
            <List.Item title={t('domain.manager')} description={data.gestionnaire}/>
            : null}
          <List.Item title={t('domain.dns')} description={data.dns.join(', ')} />
          <List.Item
            title={t('domain.created')}
            description={getDate(data.dateCreation)}
          />
          <List.Item
            title={t('domain.expired')}
            description={getDate(data.dateExpiration) + ' ' + getRelativeTime(data.nbDaysBeforeExpires)}
          />
        </ScrollView>
      ) : null}

    </View>
  ) ;
}
