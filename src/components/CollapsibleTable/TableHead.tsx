import { Cell } from "./types"

export type ColorVariant = "light" | "medium" | "dark"

type Props = {
  colorVariant?: ColorVariant
  cells: Array<Cell>
}

const variantToColorMap: { [key in ColorVariant]: string } = {
  light: "#75e4b3",
  medium: "#55DBCB",
  dark: "#3fcbdb",
}

export function TableHead({ colorVariant = "light", cells }: Props) {
  const backgroundColor = variantToColorMap[colorVariant]

  return (
    <thead>
      <tr
        style={{
          backgroundColor,
        }}
      >
        {cells.map((text) => (
          <th key={crypto.randomUUID()}>{text}</th>
        ))}
      </tr>
    </thead>
  )
}
