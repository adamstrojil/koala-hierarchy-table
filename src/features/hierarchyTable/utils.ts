import { Optional } from "../../app/types"
import { RowId, Rows, TableData } from "../../components/CollapsibleTable/types"
import { Children, JSONDatabase } from "./types"

export const getDataWithoutRemovedRow = (
  data: Optional<TableData>,
  rowIdToRemove: RowId,
): Optional<TableData> => {
  if (!data || data.rows.length === 0) {
    return null
  }
  const { rows } = data

  for (let i = 0; i < rows.length; i++) {
    const currentRow = rows[i]
    const isRowToRemove = currentRow.rowId === rowIdToRemove
    if (isRowToRemove) {
      rows.splice(i, 1) // remove a row at index i, Note: With more time, i'd try to refactor this in an immutable way
      return rows.length ? data : null // if last row was removed, then set the whole item to null
    } else {
      const children = currentRow.children
      if (!!children) {
        // If the row has children, run this recursively on it
        currentRow.children = getDataWithoutRemovedRow(children, rowIdToRemove)
      }
    }
  }
  return data
}

const isEmpty = (obj: Children) => {
  //Note: obj type could probably be more generic, if there was potential to reuse the function
  //appareantly most performant solution (https://stackoverflow.com/a/59787784), or just some library like Ramda would do too
  for (let i in obj) {
    return false
  }
  return true
}

export const transformJsonDataToTableData = (
  jsonData: JSONDatabase,
): TableData => {
  const parsedData = {
    headers: Object.keys(jsonData[0].data), // Take the keys from first item and use them as table headers for all items (assuming sibling items have same properties!)
    rows: jsonData.map(({ data, children }) => ({
      data: Object.values(data),
      rowId: crypto.randomUUID(), // Note: adding my own id, since ID's in the data aren't unique
      children: isEmpty(children)
        ? null
        : transformJsonDataToTableData(
            children[Object.keys(children)[0]].records, //Note: not very readable, could use some improvements
          ),
    })),
  }

  return parsedData
}

//Note: This was my first solution, using array functions, less performant
const UNUSED_ALTERNATIVE_getDataWithoutRemovedRow = (
  data: TableData,
  rowIdToRemove: RowId,
): Optional<TableData> => {
  function getRowsWithoutRemovedRow(rows: Rows, rowIdToRemove: RowId): Rows {
    return rows.filter((row) => {
      if (row.rowId === rowIdToRemove) {
        return false
      }
      if (row.children) {
        row.children.rows = getRowsWithoutRemovedRow(
          row.children.rows,
          rowIdToRemove,
        )
      }
      return true
    })
  }

  function getDataWithoutItemsWithEmptyRows(
    data: TableData,
  ): Optional<TableData> {
    if (data.rows.length === 0) {
      return null
    }
    return {
      headers: data.headers,
      rows: data.rows.map((row) => {
        if (row.children) {
          return {
            ...row,
            children: getDataWithoutItemsWithEmptyRows(row.children),
          }
        } else {
          return row
        }
      }),
    }
  }

  return getDataWithoutItemsWithEmptyRows({
    headers: data.headers,
    rows: getRowsWithoutRemovedRow(data.rows, rowIdToRemove),
  })
}
