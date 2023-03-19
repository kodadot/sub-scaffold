import { ApiPromise } from '@polkadot/api'
import { DispatchError } from '@polkadot/types/interfaces'

/**
 * Apply this method to get the error message from a transaction
 * @param dispatchError - DispatchError from transaction
 * @param api - ApiPromise
 * @returns Error message as string
 */
export const getTxError = (
  dispatchError: DispatchError,
  api: ApiPromise
): string => {
  if (dispatchError.isModule) {
    const decoded = api.registry.findMetaError(dispatchError.asModule)
    const { docs, name, section } = decoded
    return `[${section}.${name}: ${docs.join(' ')}]`
  } else {
    return `[${dispatchError.toString()}]`
  }
}
