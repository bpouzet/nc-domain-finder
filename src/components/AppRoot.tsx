import React, { FC } from 'react' ;
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client' ;

import useAppUpdate from "@hooks/useAppUpdate";
import { persister, queryClient } from '@helpers/query' ;

type Props = {
  children: JSX.Element
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
