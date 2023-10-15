import { TableFlatData } from "../../components/CollapsibleTable/types"

type Data = { [key: string]: string }
type EmptyObject = Record<string, never>

export type JSONDatabaseNode = {
  data: Data
  children: Children
}
export type Children =
  | EmptyObject
  | {
      [key: string]: {
        records: JSONDatabase
      }
    }

export type JSONDatabase = Array<JSONDatabaseNode>

export type HierarchyTableState = {
  data: TableFlatData
  status: "idle" | "loading" | "failed"
}

// const testDataSample: JSONDatabase = [
//   {
//     data: {
//       Name: "Trillian",
//       Gender: "female",
//     },
//     children: {
//       has_nemesis: {
//         records: [
//           {
//             data: {
//               ID: "1007",
//               Years: "29",
//             },
//             children: {
//               has_secrete: {
//                 records: [
//                   {
//                     data: {
//                       ID: "2008",
//                       "Secrete Code": "1799820570",
//                     },
//                     children: {},
//                   },
//                   {...},
//                 ],
//               },
//             },
//           },
//         ],
//       },
//     },
//   },
//   {...},
// ]
