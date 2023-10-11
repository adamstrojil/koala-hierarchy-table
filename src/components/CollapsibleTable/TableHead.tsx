import { Cell } from "./types"

export type ColorVariant = "light" | "medium" | "dark"

type Props = {
  colorVariant: ColorVariant
  cells: Array<Cell>
}

const variantToColorMap: { [key in ColorVariant]: string } = {
  light: "#75e4b3",
  medium: "#55DBCB",
  dark: "#3fcbdb",
}

export function TableHead({ colorVariant, cells }: Props) {
  return (
    <thead>
      <tr
        style={{
          backgroundColor: variantToColorMap[colorVariant],
        }}
      >
        {cells.map((text) => (
          <td key={crypto.randomUUID()}>{text}</td>
        ))}
      </tr>
    </thead>
  )
}
