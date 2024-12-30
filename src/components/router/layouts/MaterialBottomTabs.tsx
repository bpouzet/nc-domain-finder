import {
  MaterialBottomTabNavigationEventMap,
  MaterialBottomTabNavigationOptions,
  createMaterialBottomTabNavigator,
} from 'react-native-paper/react-navigation' ;

import { ParamListBase, TabNavigationState } from '@react-navigation/native' ;

import { withLayoutContext } from 'expo-router' ;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { Navigator } = createMaterialBottomTabNavigator() ;

export const MaterialBottomTabs = withLayoutContext<
  MaterialBottomTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>(Navigator) ;
