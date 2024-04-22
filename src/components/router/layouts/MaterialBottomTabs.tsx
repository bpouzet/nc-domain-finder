import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
  MaterialBottomTabNavigationEventMap,
} from "react-native-paper/react-navigation"

import { ParamListBase, TabNavigationState } from '@react-navigation/native';

import { withLayoutContext } from "expo-router";

const BottomTabNavigator = createMaterialBottomTabNavigator().Navigator;

export const MaterialBottomTabs = withLayoutContext<
  MaterialBottomTabNavigationOptions,
  typeof BottomTabNavigator,
  TabNavigationState<ParamListBase>,
  MaterialBottomTabNavigationEventMap
>(BottomTabNavigator);
