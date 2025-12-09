import { Divider, List, Searchbar, Text } from 'react-native-paper' ;
import { FlashList, type ListRenderItem } from '@shopify/flash-list' ;
import { Platform, View } from 'react-native' ;
import { type SetStateAction, useCallback, useState } from 'react' ;
import { useRouter } from 'expo-router' ;
import { useTranslation } from 'react-i18next' ;

import type { DomainList } from '../../schemas/DomainListSchema' ;
import SafeView from '@components/SafeView' ;
import getFavicon from '@helpers/favicon' ;
import useDebounce from '@hooks/useDebounce' ;
import { useDomains } from '@hooks/queries' ;

const isIOSBelow26 = Platform.OS === 'ios' && parseInt(Platform.Version, 10) < 26 ;

export default function Home () {

  const { t } = useTranslation() ;
  const router = useRouter() ;

  const [ value, setValue ] = useState<string>('') ;
  const debouncedValue = useDebounce(value) ;

  const { data, isFetching } = useDomains(debouncedValue) ;

  const onChangeSearch = useCallback((inputValue: SetStateAction<string>) => setValue(inputValue), []) ;

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

  const EmptyList = useCallback(() => {
    if(isFetching) return null ;

    const message = (data === undefined) ? t('search.helper') : t('search.empty') ;
    return (
      <View
        style={{
          alignItems: 'center',
          height: 200,
          justifyContent: 'center',
        }}
      >
        <Text>{message}</Text>
      </View>
    ) ;
  }, [ isFetching, data, t ]) ;

  const ItemSeparator = useCallback(() => <Divider />, []) ;

  return (
    <SafeView>
      <Searchbar
        clearAccessibilityLabel={t('clear')}
        placeholder={t('search.placeholder')}
        onChangeText={onChangeSearch}
        value={value}
        loading={isFetching}
        autoCapitalize='none'
      />

      <FlashList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? isIOSBelow26 ? 0 : 85 : 130, // TODO: when available, get correct TabBarHeight
        }}
      />
    </SafeView>
  ) ;

}

