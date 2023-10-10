import { useEffect, useState } from "react"

import "./App.css"
import { Table, TableData } from "./components/Table"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import {
  deleteRow,
  fetchDataAsync,
  selectStatus,
  selectTableData,
} from "./features/hierarchyTable/hierarchyTableSlice"
import { Counter } from "./features/counter/Counter"

export type Database = Array<DatabaseNode>
type DatabaseNode = {
  data: Data
  children: Children
}
type Data = { ID: string; [key: string]: string }
type EmptyObject = Record<string, never>
type Children =
  | EmptyObject
  | {
      [key: string]: {
        // "has_nemesis", "has_secrete"
        records: Array<DatabaseNode>
      }
    }

function hasChildren(obj: Children | null) {
  return !!obj && Object.entries(obj).length !== 0
}

export const transformJsonDataToTableData = (jsonData: Database): TableData => {
  const parsedData = {
    headers: [...Object.keys(jsonData[0].data)], // Take the keys from first item and use them as table headers for everything (assumes all the items have same properties)
    rows: [
      ...jsonData.map((node: DatabaseNode) => ({
        data: Object.values(node.data),
        rowId: crypto.randomUUID(),
        children: hasChildren(node.children)
          ? transformJsonDataToTableData(
              node.children[Object.keys(node.children)[0]].records,
            )
          : null,
      })),
    ],
  }

  return parsedData
}

function App() {
  const dispatch = useAppDispatch()
  const tableData = useAppSelector(selectTableData)
  const status = useAppSelector(selectStatus)
  // const [jsonData, setJsonData] = useState<any>(null)
  // const [tableData, setTableData] = useState<TableData>({
  //   headers: [],
  //   rows: [],
  // })

  useEffect(() => {
    const JSON_FILE_PATH = "src/data/example-data.json"
    dispatch(fetchDataAsync(JSON_FILE_PATH))

    // fetch(JSON_FILE_PATH)
    //   .then((response) => {
    //     //could check for (!response.ok) here as well
    //     return response.json()
    //   })
    //   .then((data) => {
    //     setJsonData(data)
    //   })
    //   .catch((error) => {
    //     console.error("Error reading JSON file:", error)
    //   })
  }, [dispatch])

  // useEffect(() => {
  //   if (jsonData) {
  //     setTableData(transformJsonDataToTableData(jsonData))
  //   }
  // }, [jsonData])

  return (
    <div>
      <h1>{status === "loading" ? "Loading..." : "Table"}</h1>
      {/* <Counter /> */}
      <Table
        data={tableData}
        rowActions={{
          headerText: "Actions",
          buttons: [
            {
              text: "remove",
              onClick: (rowId) => dispatch(deleteRow({ rowId })),
            },
          ],
        }}
      />
    </div>
  )
}

export default App
