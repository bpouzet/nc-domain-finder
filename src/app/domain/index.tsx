import * as Calendar from 'expo-calendar' ;
import * as Linking from 'expo-linking' ;
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated' ;
import { Appbar, FAB, List, Snackbar, useTheme } from 'react-native-paper' ;
import { Platform, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native' ;
import { useRouter, useSearchParams } from 'expo-router' ;
import { AxiosError } from 'axios' ;
import { DateTime } from 'luxon' ;
import { startAddEventToCalendarAsync } from 'expo-community-add-event-to-calendar' ;
import { useSafeAreaInsets } from 'react-native-safe-area-context' ;
import { useState } from 'react' ;
import { useTranslation } from 'react-i18next' ;

import { DomainList } from '../../schemas/DomainListSchema' ;
import ErrorView from '@components/views/ErrorView' ;
import LoaderImage from '@components/LoaderImage' ;
import LoaderItems from '@components/LoaderItems' ;
import getFavicon from '@helpers/favicon' ;
import { useDomain } from '@helpers/query' ;
import useFavoritesStore from '@hooks/useFavoritesStore' ;

const BOTTOM_APPBAR_HEIGHT = 80 ;
const MEDIUM_FAB_HEIGHT = 56 ;

const CHECK_DNS_URL = 'https://www.whatsmydns.net/#A/' ;
const THUMB_URL = 'https://image.thum.io/get/noanimate/http://' ;

const options = {
  day: 'numeric',
  month: 'long',
  weekday: 'long',
  year: 'numeric',
} ;

export default function Domain() {
  const { t } = useTranslation() ;
  const theme = useTheme() ;
  const router = useRouter() ;

  const { domain, extension } = useSearchParams() ;

  const { bottom, top } = useSafeAreaInsets() ;
  const { height } = useWindowDimensions() ;

  const sharedVal = useSharedValue(BOTTOM_APPBAR_HEIGHT + bottom) ;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [ { translateY: withTiming(sharedVal.value, { duration: 500 }) } ],
    } ;
  }) ;

  const { data, isLoading, error } = useDomain(domain, extension) ;

  if(error && error instanceof AxiosError) console.log('error => ', error) ;

  if( data ) {
    sharedVal.value = 0 ;
  }

  const [ showSnackBar, setShowSnackBar ] = useState<boolean>(false) ;

  const { addFavorite, isFavorite, removeFavorite } = useFavoritesStore() ;

  const header = (40 / 100) * height ;

  const isItemFavorite = isFavorite({ extension, name: domain }) ;

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

  const onAddReminder = () => {
    void addReminder() ;
  } ;

  const addReminder = async () => {
    try {
      if(!data) return ;

      const timeZone = 'Pacific/Noumea' ;
      const eventTitle = t('reminder.title', { val: domain + extension }) ;

      let endDate = DateTime.fromISO(data.dateExpiration, { zone: timeZone }) ;
      endDate = endDate.plus({ hours: 23, minutes: 59 }) ;

      const startDate = DateTime.fromISO(data.dateExpiration, { zone: timeZone }) ;

      if( Platform.OS === 'android' ) {

        const event = {
          endDate: endDate.toJSDate(),
          startDate: startDate.toJSDate(),
          title: eventTitle,
        } ;

        await startAddEventToCalendarAsync(event) ;

      } else if(Platform.OS === 'ios') {
        // check if calendar is available
        const available = await Calendar.isAvailableAsync() ;

        if(available) {
          // check permissions
          const { status } = await Calendar.requestRemindersPermissionsAsync() ;
          if(status === Calendar.PermissionStatus.GRANTED) {
            const minusDate = startDate.minus({ days: 7 }) ;

            await Calendar.createReminderAsync(null, {
              dueDate: startDate.toJSDate(),
              notes: t('reminder.date', { val: startDate.toString() }),
              startDate: minusDate.toJSDate(),
              timeZone,
              title: eventTitle,
            }) ;

            setShowSnackBar(true) ;
          } else {
            console.log('NOT GRANTED') ;
          }
        }
      }
      return ;
    } catch (e) {
      console.log('ERROR => ', e) ;
      return ;
    }
  } ;

  const onCheckDNS = () => void Linking.openURL(CHECK_DNS_URL + domain + extension) ;

  const onOpenWebsite = () => void Linking.openURL('http://' + domain + extension) ;

  const onChangeFavorite = () => {
    const fav: DomainList = { extension, name: domain } ;
    if(isFavorite(fav)) {
      removeFavorite(fav) ;
    } else {
      addFavorite(fav) ;
    }
  } ;

  const renderContent = () => {
    if( isLoading ) {
      return <LoaderItems items={4} /> ;
    } else if( data ) {
      return (
        <ScrollView
          contentContainerStyle={{ paddingBottom: BOTTOM_APPBAR_HEIGHT + bottom }}
          style={{ flex: 1 }}
        >
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
      ) ;
    } else {
      return null ;
    }
  } ;

  if( !domain || !extension ) {
    return (
      <ErrorView
        description={t('domain.missing.description', { val: (domain + extension) })}
        icon='alert'
        title={t('domain.missing.title')}
      />
    ) ;
  } else if( error && error instanceof AxiosError ) {

    // default
    let errorTitle = t('domain.error.title') ;
    let errorDescription = t('domain.error.title') ;

    if( error.response ) {
      if( error.response.status === 404 ) {
        errorTitle = t('domain.notFound.title') ;
        errorDescription = t('domain.notFound.description', { val: (domain + extension) }) ;
      } else {
        errorTitle = t('domain.badRequest.title') ;
        errorDescription = t('domain.badRequest.description', { val: (domain + extension) }) ;
      }
    }

    return (
      <ErrorView
        description={errorDescription}
        icon='alert'
        title={errorTitle}
      />
    ) ;
  }

  return (
    <>
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <View style={{ height: header }}>
          <Appbar.Header
            style={{
              backgroundColor: 'transparent',
              paddingHorizontal: 0,
              width: '100%',
            }}
          >
            <LoaderImage
              source={{ uri: THUMB_URL + domain + extension }}
              style={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                flex: 1,
              }}
              contentFit='cover'
              shimmerStyle={{
                height: header,
                position: 'absolute',
                top: -top,
                width: '100%',
              }}
            />
            <Appbar.BackAction
              style={{ backgroundColor: theme.colors.background, zIndex: 2 }}
              onPress={() => router.back()}
            />
          </Appbar.Header>
        </View>

        <List.Item
          title={domain}
          description={extension}
          left={getFavicon(domain, extension)}
        />

        {renderContent()}
      </View>

      <Snackbar
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
        style={{ bottom: BOTTOM_APPBAR_HEIGHT }}
      >{t('reminder.added')}</Snackbar>

      <Animated.View
        style={[
          styles.bottom,
          {
            backgroundColor: theme.colors.elevation.level2,
            paddingBottom: bottom,
          },
          animatedStyles,
        ]}
      >
        <Appbar
          style={{
            backgroundColor: theme.colors.elevation.level2,
            height: BOTTOM_APPBAR_HEIGHT,
          }}
        >
          <Appbar.Action
            accessibilityLabel={t('actions.openWebsite')}
            icon="open-in-new"
            onPress={onOpenWebsite}
          />
          <Appbar.Action
            accessibilityLabel={t('actions.checkDNS')}
            icon="dns"
            onPress={onCheckDNS}
          />
          <Appbar.Action
            accessibilityLabel={t('actions.addReminder')}
            icon="bell-outline"
            onPress={onAddReminder}
          />
          <FAB
            accessibilityLabel={isItemFavorite ? t('actions.removeFavorite') : t('actions.addFavorite')}
            mode="flat"
            size="medium"
            icon={isItemFavorite ? 'heart' : 'heart-outline'}
            onPress={onChangeFavorite}
            style={[
              styles.fab,
              { top: (BOTTOM_APPBAR_HEIGHT - MEDIUM_FAB_HEIGHT) / 2 },
            ]}
          />
        </Appbar>
      </Animated.View>
    </>
  ) ;
}

const styles = StyleSheet.create({
  bottom: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
  },
}) ;
