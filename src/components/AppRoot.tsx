import React, { FC } from 'react' ;
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client' ;
import { Try } from 'expo-router/build/views/Try' ;

import { persister, queryClient } from '@helpers/query' ;
import ErrorAppBoundary from '@components/ErrorAppBoundary' ;

type Props = {
  children: JSX.Element
}

const AppRoot: FC<Props> = ({ children }) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Try catch={ErrorAppBoundary}>
        { children }
      </Try>
    </PersistQueryClientProvider>
  ) ;
} ;

export default AppRoot ;
