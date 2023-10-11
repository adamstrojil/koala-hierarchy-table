import { ColorVariant } from "./TableHead"

export const getHeaderVariantByLevel = (level: number): ColorVariant => {
  const variants: Array<ColorVariant> = ["light", "medium", "dark"]
  const validOrLastIndex = Math.min(level, variants.length)

  return variants[validOrLastIndex]
}
