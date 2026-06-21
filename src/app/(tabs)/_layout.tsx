import { DynamicColorIOS, Platform } from 'react-native' ;
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons' ;
import { NativeTabs } from 'expo-router/unstable-native-tabs' ;
import { useTheme } from 'react-native-paper' ;
import { useTranslation } from 'react-i18next' ;

export default function RootLayout() {

  const { t } = useTranslation() ;
  const theme = useTheme() ;
  return (
    <NativeTabs 
      backBehavior='history'
      backgroundColor={theme.colors.surfaceVariant}
      indicatorColor={theme.colors.inversePrimary}
      labelStyle={{ color: theme.colors.onSurfaceVariant, fontFamily: 'SpaceMono-Regular', fontSize: 12 }}
      tintColor={theme.colors.primary}
      rippleColor={theme.colors.secondaryContainer}
      iconColor={theme.colors.onSurfaceVariant}
      minimizeBehavior='onScrollDown'
      blurEffect='systemMaterial'
      {...(Platform.OS === 'ios' ? {
        style: {
          // For the text color
          color: DynamicColorIOS({
            dark: 'white',
            light: 'black',
          }),
          // For the selected icon color
          tintColor: DynamicColorIOS({
            dark: 'white',
            light: 'black',
          }),
        },
      } : {})}
    >
      <NativeTabs.Trigger name='home'>
        <NativeTabs.Trigger.Label>{t('search.title')}</NativeTabs.Trigger.Label>
        {Platform.select({
          android: <NativeTabs.Trigger.Icon src={<NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name='magnify' />} />,
          ios: <NativeTabs.Trigger.Icon sf='magnifyingglass' />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='favorites'>
        <NativeTabs.Trigger.Label>{t('favorites.title')}</NativeTabs.Trigger.Label>
        {Platform.select({
          android: <NativeTabs.Trigger.Icon src={<NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name='cards-heart' />} />,
          ios: <NativeTabs.Trigger.Icon sf='heart.fill' />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='settings'>
        <NativeTabs.Trigger.Label>{t('settings.title')}</NativeTabs.Trigger.Label>
        {Platform.select({
          android: <NativeTabs.Trigger.Icon src={<NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name='cog' />} />,
          ios: <NativeTabs.Trigger.Icon sf='gearshape.fill' />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  ) ;
}
