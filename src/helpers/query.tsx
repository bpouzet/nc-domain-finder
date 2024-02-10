import { QueryClient } from '@tanstack/react-query' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;
import Constants from 'expo-constants' ;
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister' ;

import { MyExpoConfig } from '@customTypes/expoConfig' ;

const API_URL = 'https://domaine-nc.p.rapidapi.com/domaines' ;

const headers = {
  'Accept': 'application/json',
  'X-RapidAPI-Key': (Constants.expoConfig as MyExpoConfig).extra.api.key,
} ;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours,
      //queryFn: defaultQueryFn,
      retry: 2,
    },
  },
}) ;

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  //key:
}) ;

export { queryClient, persister, API_URL, headers } ;
