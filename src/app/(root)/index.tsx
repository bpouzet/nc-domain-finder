import { Divider, List, Searchbar, Text } from 'react-native-paper' ;
import { FlashList, ListRenderItem } from '@shopify/flash-list' ;
import { SetStateAction, useCallback, useState } from 'react' ;
import { View } from 'react-native' ;
import { useRouter } from 'expo-router' ;
import { useTranslation } from 'react-i18next' ;

import { DomainList } from '../../schemas/DomainListSchema' ;
import SafeView from '@components/SafeView' ;
import getFavicon from '@helpers/favicon' ;
import useDebounce from '@hooks/useDebounce' ;
import { useDomains } from '@helpers/query' ;


export default function Index () {

  const { t } = useTranslation() ;
  const router = useRouter() ;

  const [ value, setValue ] = useState<string>('') ;
  const debouncedValue = useDebounce(value) ;

  const { data, isFetching } = useDomains(debouncedValue) ;

  const onChangeSearch = useCallback((inputValue: SetStateAction<string>) => setValue(inputValue), []) ;

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
    <SafeView>
      <Searchbar
        clearAccessibilityLabel={t('clear')}
        searchAccessibilityLabel={t('search.placeholder')}
        placeholder={t('search.placeholder')}
        onChangeText={onChangeSearch}
        value={value}
        loading={isFetching}
      />

      {data ? (
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={70}
          ItemSeparatorComponent={() => <Divider />}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Text>{t('search.helper')}</Text>
        </View>
      )}
    </SafeView>
  ) ;

}

