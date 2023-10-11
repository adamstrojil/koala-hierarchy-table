import { useEffect } from "react"
import { ImCross } from "react-icons/im"

import "./App.css"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { Table } from "./components/Table/Table"
import {
  deleteRow,
  fetchData,
  selectStatus,
  selectTableData,
} from "./features/hierarchyTable/hierarchyTableSlice"

const JSON_FILE_PATH = "src/data/example-data.json"

export function App() {
  const dispatch = useAppDispatch()
  const tableData = useAppSelector(selectTableData)
  const status = useAppSelector(selectStatus)

  useEffect(
    function fetchDataOnPageLoad() {
      dispatch(fetchData(JSON_FILE_PATH))
    },
    [dispatch],
  )

  if (status === "failed") {
    return "There has been an error."
  }

  if (status === "loading") {
    return "Loading..."
  }

  return (
    <>
      <h1>Hieararchy table</h1>
      {tableData ? (
        <Table
          data={tableData}
          rowActions={{
            headerText: "Actions",
            buttons: [
              {
                accessibilityLabel: "Delete row",
                color: "#dd0000",
                content: <ImCross />,
                onClick: (rowId) => dispatch(deleteRow({ rowId })),
              },
            ],
          }}
        />
      ) : (
        "No data to display..."
      )}
    </>
  )
}
