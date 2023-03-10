import { Appbar, Divider, List, Text } from 'react-native-paper' ;
import { FlashList, ListRenderItem } from '@shopify/flash-list' ;
import { View } from 'react-native' ;
import { useCallback } from 'react' ;
import useFavoritesStore from '@hooks/useFavoritesStore' ;
import { useRouter } from 'expo-router' ;
import { useTranslation } from 'react-i18next' ;

import { DomainList } from '../../schemas/DomainListSchema' ;
import getFavicon from '@helpers/favicon' ;

export default function Favorites() {
  const { t } = useTranslation() ;
  const router = useRouter() ;

  const favorites = useFavoritesStore(state => state.favorites) ;

  const onPress = (item: DomainList) => () => router.push({
    params: {
      domain: item.name,
      extension: item.extension,
    },
    pathname: 'domain',
  }) ;

  const renderItem: ListRenderItem<DomainList> = useCallback(({ item }) => (
    <List.Item
      title={item.name}
      description={item.extension}
      onPress={onPress(item)}
      left={getFavicon(item.name, item.extension)}
    />
  ), []) ;

  const EmptyList = useCallback(() => (
    <View
      style={{
        alignItems: 'center',
        height: 200,
        justifyContent: 'center',
      }}
    >
      <Text>{t('favorites.empty')}</Text>
    </View>
  ), []) ;

  const ItemSeparator = useCallback(() => <Divider />, []) ;

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={t('favorites.title')} />
      </Appbar.Header>
      <FlashList
        data={favorites}
        estimatedItemSize={70}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyList}
      />
    </View>
  ) ;

}
