import { stringify } from './querystring'

type Options = RequestInit & {
  params?: Record<string, any>
  data?: Record<string, any>
}

export const fetchEnhanced = (input: string, options?: Options): Promise<any> => {
  const requestUrl = options?.params ? `${input}?${stringify(options.params)}` : input

  return fetch(requestUrl, {
    ...options,
    headers: {
      'content-type': 'application/json',
      ...options?.headers,
    },
    body: JSON.stringify(options?.data || options?.body),
    credentials: 'include',
  }).then(async (res) => {
    if (res.status < 200 || res.status >= 300) {
      return Promise.reject(await res.json())
    }

    return res.json()
  })
}