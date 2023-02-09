// All supported nodes in paraspell
export const SUPPORTED_NODES = ['Karura', 'BifrostKusama', 'Pichiu'] as const

export type SupportedNode = (typeof SUPPORTED_NODES)[number]
export type DestinationOption = {
  label: string
  value: string
}

/**
 * Method to split nodes to 2 arrays by nodes availibility in Paraspell
 * @param nodes - All the nodes
 * @param availible - List of availible nodes
 * @returns [supported, unsupported]
 */
export const splitNodesByAvailibility = (
  nodes: DestinationOption[],
  availible: typeof SUPPORTED_NODES | SupportedNode[]
): [DestinationOption[], (DestinationOption & { disabled: boolean })[]] => {
  return nodes.reduce(
    (acc, val) => {
      if (availible.find((symbol) => val.label === symbol)) {
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
 * Method to split assets to 2 arrays by asset availibility in Paraspell
 * @param nodes - All the assets
 * @param availible - List of availible assets
 * @returns [supported, unsupported]
 */
export const splitAssetsByAvailibility = (
  assets: AssetOption[],
  availible: typeof SUPPORTED_ASSETS | SupportedAsset[]
): [AssetOption[], (AssetOption & { disabled: boolean })[]] => {
  return assets.reduce(
    (acc, val) => {
      if (availible.find((symbol) => val.label === symbol)) {
        acc[0].push(val)
        return acc
      }
      acc[1].push({ ...val, disabled: true })
      return acc
    },
    [[], []] as [AssetOption[], (AssetOption & { disabled: boolean })[]]
  )
}
