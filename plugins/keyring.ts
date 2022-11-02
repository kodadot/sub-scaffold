import { cryptoWaitReady } from '@polkadot/util-crypto'

export default (): void => {
  cryptoWaitReady()
}
