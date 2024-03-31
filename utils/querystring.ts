export function stringify(query: Record<string, any>) {
  if (query && typeof query === 'object') {
    const querys: string[] = []
    Object.keys(query).forEach((key) => {
      querys.push(`${key}=${encodeURIComponent(query[key])}`)
    })
    return querys.join('&')
  }
  return query
}
