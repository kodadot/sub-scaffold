// All supported nodes in paraspell
export const SUPPORTED_NODES = ['Karura', 'BifrostKusama', 'Pichiu'] as const

export type SupportedNode = (typeof SUPPORTED_NODES)[number]
export type DestinationOption = {
  label: string
  value: string
}

/**
 * Method to split nodes to 2 arrays by nodes availability in Paraspell
 * @param nodes - All the nodes
 * @param available - List of available nodes
 * @returns [supported, unsupported]
 */
export const splitNodesByAvailability = (
  nodes: DestinationOption[],
  available: typeof SUPPORTED_NODES | SupportedNode[]
): [DestinationOption[], (DestinationOption & { disabled: boolean })[]] => {
  return nodes.reduce(
    (acc, val) => {
      if (available.find((symbol) => val.label === symbol)) {
        acc[0].push(val)
        return acc
      }
      acc[1].push({ ...val, disabled: true })
      return acc
    },
    [[], []] as [
      DestinationOption[],
      (DestinationOption & { disabled: boolean })[]
    ]
  )
}
// All supported assets in paraspell
export const SUPPORTED_ASSETS = ['KSM'] as const

export type SupportedAsset = (typeof SUPPORTED_ASSETS)[number]
export type AssetOption = {
  label: string
  value: number
}

/**
 * Method to split assets to 2 arrays by asset availability in Paraspell
 * @param nodes - All the assets
 * @param available - List of available assets
 * @returns [supported, unsupported]
 */
export const splitAssetsByAvailability = (
  assets: AssetOption[],
  available: typeof SUPPORTED_ASSETS | SupportedAsset[]
): [AssetOption[], (AssetOption & { disabled: boolean })[]] => {
  return assets.reduce(
    (acc, val) => {
      if (available.find((symbol) => val.label === symbol)) {
        acc[0].push(val)
        return acc
      }
      acc[1].push({ ...val, disabled: true })
      return acc
    },
    [[], []] as [AssetOption[], (AssetOption & { disabled: boolean })[]]
  )
}
