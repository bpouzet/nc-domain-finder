import * as Sentry from 'sentry-expo' ;
import { QueryClient, useQuery } from '@tanstack/react-query' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;
import Constants from 'expo-constants' ;
import axios from 'axios' ;
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister' ;
import { z } from 'zod' ;

import DomainListSchema, { DomainList } from '../schemas/DomainListSchema' ;
import DomainSchema from '../schemas/DomainSchema' ;
import { MyExpoConfig } from '@customTypes/expoConfig' ;

const API_URL = 'https://domaine-nc.p.rapidapi.com/domaines' ;

const headers = {
  'Accept': 'application/json',
  'X-RapidAPI-Key': (Constants.expoConfig as MyExpoConfig).extra.api.key,
} ;

function fetchDomains(search: string): Promise<DomainList[]> {
  return axios.get(
    API_URL + '?startswith=' + search,
    {
      headers,
    }
  ).then(response => {
    if(response) {
      return z.array(DomainListSchema).parse(response.data) ;
    }
    return [] ;
  }).catch(error => {
    Sentry.Native.captureException(error) ;
    return [] ;
  }) ;
}

function useDomains(search: string) {
  return useQuery({
    enabled: search !== '',
    queryFn: () => fetchDomains(search),
    queryKey: [ search ],
  }) ;
}

function useDomain(name: string, extension: string) {
  return useQuery({
    enabled: name !== undefined && extension !== undefined,
    queryFn: () => {
      const ext = extension.startsWith('.') ? extension.substring(1) : extension ;
      return axios.get(
        API_URL + '/' + name + '/' + ext,
        {
          headers,
        }
      ).then(response => DomainSchema.parse(response.data)) ;
    },
    queryKey: [ name, extension ],
  }) ;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours,
      //queryFn: defaultQueryFn,
      retry: 2,
    },
  },
}) ;

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  //key:
}) ;

export { queryClient, persister, useDomain, useDomains } ;
