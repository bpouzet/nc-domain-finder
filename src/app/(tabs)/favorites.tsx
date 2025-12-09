import { Appbar, Divider, List, Text, useTheme } from 'react-native-paper' ;
import { FlashList, type ListRenderItem } from '@shopify/flash-list' ;
import { View } from 'react-native' ;
import { useCallback } from 'react' ;
import useFavoritesStore from '@hooks/useFavoritesStore' ;
import { useRouter } from 'expo-router' ;
import { useTranslation } from 'react-i18next' ;

import type { DomainList } from '../../schemas/DomainListSchema' ;
import getFavicon from '@helpers/favicon' ;

export default function Favorites() {
  const { t } = useTranslation() ;
  const router = useRouter() ;
  const theme = useTheme() ;
  const favorites = useFavoritesStore(state => state.favorites) ;

  const renderItem: ListRenderItem<DomainList> = useCallback(({ item }) => {
    const onPress = (item: DomainList) => () => router.push({
      params: {
        domain: item.name,
        extension: item.extension,
      },
      pathname: 'domain',
    }) ;

    return (
      <List.Item
        title={item.name}
        description={item.extension}
        onPress={onPress(item)}
        left={getFavicon(item.name, item.extension)}
      />
    ) ;
}, [ router ]) ;

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
  ), [ t ]) ;

  const ItemSeparator = useCallback(() => <Divider />, []) ;

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title={t('favorites.title')} />
      </Appbar.Header>
      <FlashList
        data={favorites}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyList}
      />
    </View>
  ) ;

}
