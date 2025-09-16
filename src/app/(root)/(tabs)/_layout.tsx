import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons' ;
import React from 'react' ;
import { useTheme } from 'react-native-paper' ;
import { useTranslation } from 'react-i18next' ;

import { MaterialBottomTabs } from '@components/router/layouts/MaterialBottomTabs' ;

const renderTabBarIcon = (name: React.ComponentProps<typeof MaterialCommunityIcons>['name']) => ({ color }: {color: string}) => <TabBarIcon name={name} color={color} /> ;

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) => {
  return <MaterialCommunityIcons size={24} style={{ marginBottom: 0 }} {...props} /> ;
} ;

export default function RootLayout() {

  const { t } = useTranslation() ;
  const theme = useTheme() ;

  return (
    <MaterialBottomTabs
      initialRouteName='home'
      backBehavior='history'
      theme={theme}
      screenOptions={{
        headerShown: false,
      }}
    >
      <MaterialBottomTabs.Screen
        name='home'
        options={{
          href: '/home',
          tabBarIcon: renderTabBarIcon('magnify'),
          title: t('search.title'),
        }}
      />
      <MaterialBottomTabs.Screen
        name='favorites'
        options={{
          href: '/favorites',
          tabBarIcon: renderTabBarIcon('cards-heart'),
          title: t('favorites.title'),
        }}
      />
      <MaterialBottomTabs.Screen
        name='settings'
        options={{
          href: '/settings',
          tabBarIcon: renderTabBarIcon('cog'),
          title: t('settings.title'),
        }}
      />
    </MaterialBottomTabs>
  ) ;
}
