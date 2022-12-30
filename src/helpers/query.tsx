import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister' ;
import { QueryClient } from '@tanstack/react-query' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    }
  }
}) ;

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  //key:
}) ;

export { queryClient, persister } ;
