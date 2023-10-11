import { ReactNode } from "react"

import { Optional } from "../../app/types"

export type Cell = string

export type RowId = string

export type Row = {
  data: Array<Cell>
  children: Optional<TableData>
  rowId: RowId
}

export type Headers = Array<Cell>

export type Rows = Array<Row>

export type TableData = {
  headers: Headers
  rows: Rows
}

export type ActionButton = {
  color: string
  content: ReactNode
  onClick: (rowId: RowId) => void
  accessibilityLabel?: string
}

export type RowActions = {
  headerText: string
  buttons: Array<ActionButton>
}
