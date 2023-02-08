import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons' ;
import React from 'react' ;
import { useTranslation } from 'react-i18next' ;

import MaterialTabs from '@components/router/layouts/MaterialTabs' ;

const renderTabBarIcon = (name: React.ComponentProps<typeof MaterialCommunityIcons>['name']) => ({ color }: {color: string}) => <TabBarIcon name={name} color={color} /> ;

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) => {
  return <MaterialCommunityIcons size={24} style={{ marginBottom: 0 }} {...props} /> ;
} ;

export default function RootLayout() {

  const { t } = useTranslation() ;

  return (
    <MaterialTabs
      initialRouteName='index'
    >
      <MaterialTabs.Screen
        name='index'
        options={{
          href: '/',
          tabBarIcon: renderTabBarIcon('magnify'),
          title: t('search.title'),
        }}
      />
      <MaterialTabs.Screen
        name='favorites'
        options={{
          href: '/favorites',
          tabBarIcon: renderTabBarIcon('cards-heart'),
          title: t('favorites.title'),
        }}
      />
      <MaterialTabs.Screen
        name='about'
        options={{
          href: '/about',
          tabBarIcon: renderTabBarIcon('information-variant'),
          title: t('about.title'),
        }}
      />
    </MaterialTabs>
  ) ;
}
