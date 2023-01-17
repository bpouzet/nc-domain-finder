import { ExpoRoot } from 'expo-router' ;
import { RequireContext } from 'expo-router/build/types' ;
import { registerRootComponent } from 'expo' ;

import AppRoot from '@components/AppRoot' ;

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx: RequireContext = require.context('./app') ;
  return (
    <AppRoot>
      <ExpoRoot context={ ctx } />
    </AppRoot>
  ) ;
}

registerRootComponent(App) ;
