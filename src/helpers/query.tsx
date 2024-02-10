import { QueryClient, useQuery } from '@tanstack/react-query' ;
import AsyncStorage from '@react-native-async-storage/async-storage' ;
import Constants from 'expo-constants' ;
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister' ;

import { DomainList } from '../schemas/DomainListSchema' ;
import { MyExpoConfig } from '@customTypes/expoConfig' ;

const API_URL = 'https://domaine-nc.p.rapidapi.com/domaines' ;

const headers = {
  'Accept': 'application/json',
  'X-RapidAPI-Key': (Constants.expoConfig as MyExpoConfig).extra.api.key,
} ;

function fetchDomains(search: string, signal?: AbortSignal) {
  return fetch(
    API_URL + '?startswith=' + search,
    {
      headers,
      signal,
    }
  ).then(response => {
    if ( !response.ok ) throw Error(response.statusText)
    return response.json() as Promise<DomainList[]> ;
  }) ;
}

function useDomains(search: string) {
  return useQuery({
    enabled: search !== '',
    queryFn: ({ signal }) => fetchDomains(search, signal),
    queryKey: [ search ],
  }) ;
}

function useDomain(name: string, extension: string) {
  return useQuery({
    enabled: name !== undefined && extension !== undefined,
    queryFn: ({ signal }) => {
      const ext = extension.startsWith('.') ? extension.substring(1) : extension ;
      return fetch(
        API_URL + '/' + name + '/' + ext,
        {
          headers,
          signal,
        }
      ).then(response => {
        if ( !response.ok ) throw Error(response.statusText)
        return response.json() as Promise<DomainList> ;
      }) ;
    },
    queryKey: [ name, extension ],
  }) ;
}

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

export { queryClient, persister, useDomain, useDomains } ;
