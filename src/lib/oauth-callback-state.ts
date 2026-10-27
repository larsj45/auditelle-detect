/** Only a fixed dashboard destination is allowed; never reflect OAuth/query input. */
export function oauthCallbackState(url: string, hasSession: boolean, hasError: boolean): 'success' | 'error' {
  const parsed = new URL(url)
  const fragment = new URLSearchParams(parsed.hash.slice(1))
  if (hasError || parsed.searchParams.has('error') || fragment.has('error')) return 'error'
  return hasSession ? 'success' : 'error'
}

export const oauthSuccessPath = '/dashboard'
