export * from './date'
export * from './validate'
export * from './number'
export * from './storage'

export function getStatus(status: string) {
  if (status !== 'underway') {
    return 'Ended'
  }
  return 'Funding'
}
