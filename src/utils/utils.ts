import { Rows } from "../components/Table"

export function removeRow(rows: Rows, rowIdToRemove: string): Rows {
  const updatedRows = rows.filter((row) => {
    if (row.rowId === rowIdToRemove) {
      return false
    }
    if (row.children) {
      row.children.rows = removeRow(row.children.rows, rowIdToRemove)
    }
    return true
  })
  return updatedRows
}
