import { Optional } from "../../app/types"
import { Rows, TableData } from "../../components/Table/types"
import { Children, JSONDatabase } from "./types"

export function getRowsWithoutRemoved(rows: Rows, rowIdToRemove: string): Rows {
  return rows.filter((row) => {
    if (row.rowId === rowIdToRemove) {
      return false
    }
    if (row.children) {
      row.children.rows = getRowsWithoutRemoved(
        row.children.rows,
        rowIdToRemove,
      )
    }
    return true
  })
}

export function getDataWithoutItemsWithEmptyRows(
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

const isEmpty = (obj: Children) => {
  //obj type could be more generic, if there was potential to to reuse the function
  //appareantly most performant solution (https://stackoverflow.com/a/59787784), or just some library like Ramda works too
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
