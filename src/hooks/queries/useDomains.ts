import { useQuery } from '@tanstack/react-query' ;

import { API_URL, headers } from '@helpers/query' ;

import type { Domain } from '../../schemas/DomainSchema' ;
import type { DomainList } from '../../schemas/DomainListSchema' ;

function fetchDomains(search: string, signal?: AbortSignal) {
  return fetch(
    API_URL + '?startswith=' + search,
    {
      headers,
      signal,
    }
  ).then(response => {
    if ( !response.ok ) throw Error(response.statusText) ;
    return response.json() as Promise<DomainList[]> ;
  }) ;
}

const useDomain = (name: string, extension: string) => {
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
        if ( !response.ok ) throw Error(response.statusText) ;
        return response.json() as Promise<Domain> ;
      }) ;
    },
    queryKey: [ name, extension ],
  }) ;
} ;

const useDomains = (search: string) => {
  return useQuery({
    enabled: search !== '',
    queryFn: ({ signal }) => fetchDomains(search, signal),
    queryKey: [ search ],
  }) ;
} ;

export { useDomain, useDomains } ;
