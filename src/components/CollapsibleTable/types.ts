import { ReactNode } from "react"

export type TableFlatData = {
  [key: string]: TableFlatDataNode
}

export type TableFlatDataNode = {
  id: string | number
  data: Array<string>
  childIds: Array<string | number>
}

export type ActionButton = {
  color: string
  content: ReactNode
  onClick: (rowId: RowId, parentId: RowId) => void
  accessibilityLabel?: string
}

export type RowActions = {
  headerText: string
  buttons: Array<ActionButton>
}
export type Cell = string
export type RowId = number | string
export type RowIds = Array<RowId>

// export const testData: TableFlatData = {
//   root: {
//     id: 0,
//     data: [],
//     childIds: [0, 1],
//   },
//   0: {
//     id: 0,
//     data: ["Name", "Gender"],
//     childIds: [],
//   },
//   1: {
//     id: 1,
//     data: ["Trillian", "female"],
//     childIds: [2, 3],
//   },
//   2: {
//     id: 2,
//     data: ["ID", "Years"],
//     childIds: [],
//   },
//   3: {
//     id: 3,
//     data: ["1007", "29"],
//     childIds: [4, 5],
//   },
//   4: {
//     id: 4,
//     data: ["ID", "Secret Code"],
//     childIds: [],
//   },
//   5: {
//     id: 5,
//     data: ["2008", "1799820570"],
//     childIds: [],
//   },
// }
