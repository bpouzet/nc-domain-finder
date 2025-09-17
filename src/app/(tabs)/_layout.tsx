import { DynamicColorIOS, Platform } from 'react-native' ;
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs' ;
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons' ;
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
        <Label>{t('search.title')}</Label>
        {Platform.select({
          android: <Icon src={<VectorIcon family={MaterialCommunityIcons} name='magnify' />} />,
          ios: <Icon sf='magnifyingglass' />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='favorites'>
        <Label>{t('favorites.title')}</Label>
        {Platform.select({
          android: <Icon src={<VectorIcon family={MaterialCommunityIcons} name='cards-heart' />} />,
          ios: <Icon sf='heart.fill' />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='settings'>
        <Label>{t('settings.title')}</Label>
        {Platform.select({
          android: <Icon src={<VectorIcon family={MaterialCommunityIcons} name='cog' />} />,
          ios: <Icon sf='gearshape.fill' />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  ) ;
}
