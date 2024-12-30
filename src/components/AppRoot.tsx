import React, { FC } from 'react' ;
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client' ;

import { persister, queryClient } from '@helpers/query' ;
import useAppUpdate from '@hooks/useAppUpdate' ;

type Props = {
  children: React.ReactNode
}

const AppRoot: FC<Props> = ({ children }) => {
  useAppUpdate() ;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      { children }
    </PersistQueryClientProvider>
  ) ;
} ;

export default AppRoot ;
