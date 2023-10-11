import { Optional } from "../../app/types"

export type Cell = string
export type Row = {
  data: Array<Cell>
  children: Optional<TableData>
  rowId: string
}

export type Headers = Array<Cell>
export type Rows = Array<Row>

export type TableData = {
  headers: Headers
  rows: Rows
}
