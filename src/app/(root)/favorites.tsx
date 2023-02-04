import { Appbar, Divider, List } from 'react-native-paper' ;
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

  const { favorites } = useFavoritesStore() ;

  const onPress = (item: DomainList) => () => router.push({
    params: {
      extension: item.extension,
      name: item.name,
    },
    pathname: 'domain/:name',
  }) ;

  const renderItem: ListRenderItem<DomainList> = useCallback(({ item }) => (
    <List.Item
      title={item.name}
      description={item.extension}
      onPress={onPress(item)}
      left={getFavicon(item.name, item.extension)}
    />
  ), []) ;

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={t('favorites')} />
      </Appbar.Header>
      <FlashList
        data={favorites}
        estimatedItemSize={70}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  ) ;

}
