import { Optional } from "../../app/types"
import {
  Cell,
  RowId,
  TableFlatData,
} from "../../components/CollapsibleTable/types"
import { JSONDatabaseNode } from "./types"

export const getDataWithoutRemovedRow = (
  data: TableFlatData,
  rowId: RowId,
  parentNodeId: RowId,
) => {
  // Remove id from parent's child IDs.
  const parentNode = data[parentNodeId]
  const updatedChildIds = parentNode.childIds.filter((id) => id !== rowId)
  const isOnlyHeaderRowLeft = updatedChildIds.length === 1

  // If there's only the header left, remove it
  if (isOnlyHeaderRowLeft) {
    const headerRowId = updatedChildIds[0]
    delete data[headerRowId]
    parentNode.childIds = []
  } else {
    parentNode.childIds = updatedChildIds
  }

  // Remove the child node and all of its childs recursively.
  deleteRowWithAllChildren(data, rowId)

  return data
}

const deleteRowWithAllChildren = (data: TableFlatData, rowId: RowId) => {
  const rowToDelete = data[rowId]
  rowToDelete.childIds.forEach((id) => deleteRowWithAllChildren(data, id))
  delete data[rowId]
}

export const transformJsonDataToTableData = (
  data: Array<JSONDatabaseNode>,
): TableFlatData => {
  const parsedData: TableFlatData = {}
  let nextId = 0
  let wasHeaderAdded = false
  let isFirstNode = true

  const addRowAndUpdateParent = (
    data: Array<Cell>,
    parentId: Optional<RowId>,
  ) => {
    const id = nextId++
    parsedData[id] = {
      id,
      data,
      childIds: [],
    }
    if (parentId !== null) {
      parsedData[parentId].childIds.push(id)
    }
    return id
  }

  const processNode = (
    { data, children }: JSONDatabaseNode,
    parentId: Optional<RowId>,
  ) => {
    // the first (root) node has no data, only childIds (coming later), so let's skip it now
    if (!wasHeaderAdded && !isFirstNode) {
      addRowAndUpdateParent(Object.keys(data), parentId)
      wasHeaderAdded = true
    }
    const newNodeId = addRowAndUpdateParent(Object.values(data), parentId)
    isFirstNode = false

    const childRecords = children[Object.keys(children)[0]]?.records || []
    if (childRecords.length) {
      wasHeaderAdded = false
      childRecords.forEach((record) => {
        processNode(record, newNodeId)
      })
    }
  }

  processNode({ data: {}, children: { any: { records: data } } }, null)
  return parsedData
}
