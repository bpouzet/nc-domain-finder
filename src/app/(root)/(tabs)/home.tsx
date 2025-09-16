import { Divider, List, Searchbar, Text } from 'react-native-paper' ;
import { FlashList, type ListRenderItem } from '@shopify/flash-list' ;
import { type SetStateAction, useCallback, useState } from 'react' ;
import { View } from 'react-native' ;
import { useRouter } from 'expo-router' ;
import { useTranslation } from 'react-i18next' ;

import type { DomainList } from '../../../schemas/DomainListSchema' ;
import SafeView from '@components/SafeView' ;
import getFavicon from '@helpers/favicon' ;
import useDebounce from '@hooks/useDebounce' ;
import { useDomains } from '@hooks/queries' ;

export default function Home () {

  const { t, i18n } = useTranslation() ;
  const router = useRouter() ;

  const [ value, setValue ] = useState<string>('') ;
  const debouncedValue = useDebounce(value) ;

  const { data, isFetching } = useDomains(debouncedValue) ;

  const onChangeSearch = useCallback((inputValue: SetStateAction<string>) => setValue(inputValue), []) ;

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
  }, [ isFetching, data, i18n.language ]) ;

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
      />
    </SafeView>
  ) ;

}

