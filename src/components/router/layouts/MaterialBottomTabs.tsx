import {
  type MaterialBottomTabNavigationEventMap,
  type MaterialBottomTabNavigationOptions,
  createMaterialBottomTabNavigator,
} from 'react-native-paper/react-navigation' ;

import { type ParamListBase, type TabNavigationState } from '@react-navigation/native' ;

import { withLayoutContext } from 'expo-router' ;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { Navigator } = createMaterialBottomTabNavigator() ;

export const MaterialBottomTabs = withLayoutContext<
  MaterialBottomTabNavigationOptions & { href: string },
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>(Navigator) ;
