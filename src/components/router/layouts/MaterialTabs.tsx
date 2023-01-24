// Waiting fixing in library
// import {
//   MaterialBottomTabNavigationOptions,
//   createMaterialBottomTabNavigator,
// } from '@react-navigation/material-bottom-tabs' ;

import { MaterialBottomTabNavigationOptions, createMaterialBottomTabNavigator } from '@components/tabs' ;
import { withLayoutContext } from 'expo-router' ;

export type Href = string | HrefObject ;

export type HrefObject = {
  /** Path representing the selected route `/[id]`. */
  pathname?: string;
  /** Query parameters for the path. */
  params?: Record<string, any>;
} ;

// This is the only way to access the navigator.
const BottomTabNavigator = createMaterialBottomTabNavigator().Navigator ;

export const MaterialTabs = withLayoutContext<
  MaterialBottomTabNavigationOptions & { href?: Href | null },
  typeof BottomTabNavigator
>(BottomTabNavigator, (screens) => {
  // Support the `href` shortcut prop.
  return screens.map((screen) => {
    return screen ;
  }) ;
}) ;

export default MaterialTabs ;
