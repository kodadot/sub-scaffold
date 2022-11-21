import { Config, Prefix } from '@/types/config'
import { ChainProperties } from '@/utils/api/Query'

export const toChainProperty = (
  ss58Format: number,
  tokenDecimals: number,
  tokenSymbol: string,
  blockExplorer?: string
): ChainProperties => {
  return {
    ss58Format,
    tokenDecimals,
    tokenSymbol,
    blockExplorer,
  }
}

const DEFAULT_CHAIN_PROPERTIES = toChainProperty(
  2,
  12,
  'KSM',
  'https://kusama.subscan.io/'
)

export const BLOCK_EXPLORER_WITH_QUERY = ['snek']

const chainPropertyMap: Config<ChainProperties> = {
  rmrk: DEFAULT_CHAIN_PROPERTIES,
  bsx: toChainProperty(10041, 12, 'BSX', 'https://basilisk.subscan.io/'),
  snek: toChainProperty(
    10041,
    12,
    'BSX',
    'https://calamar.play.hydration.cloud/rococo%20basilisk/search?query='
  ),
  statemine: DEFAULT_CHAIN_PROPERTIES,
  westmint: DEFAULT_CHAIN_PROPERTIES,
  movr: toChainProperty(1285, 18, 'MOVR', 'https://moonriver.subscan.io/'),
  glmr: toChainProperty(1284, 18, 'GLMR', 'https://moonbeam.subscan.io/'),
}

export const chainPropListOf = (
  prefix: Prefix | keyof Config
): ChainProperties => {
  return chainPropertyMap[prefix]
}

export const ss58Of = (prefix: Prefix | keyof Config): number => {
  return chainPropListOf(prefix).ss58Format
}

export const correctAddressFormat = (ss58?: number | string | null): number => {
  switch (typeof ss58) {
    case 'number':
      return ss58
    case 'string':
      return Number(ss58) >= 0 ? Number(ss58) : 42
    default:
      return 42
  }
}

export const blockExplorerOf = (
  prefix: Prefix | keyof Config
): string | undefined => {
  return chainPropListOf(prefix).blockExplorer
}
