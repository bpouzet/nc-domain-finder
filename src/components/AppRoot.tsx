import React, { type FC } from 'react' ;
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client' ;

import { persister, queryClient } from '@helpers/query' ;
import useAppUpdate from '@hooks/useAppUpdate' ;
import useCheckVersion from '@hooks/useCheckVersion' ;

type Props = {
  children: React.ReactNode
}

const AppRoot: FC<Props> = ({ children }) => {
  useAppUpdate() ;

  useCheckVersion() ;

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
