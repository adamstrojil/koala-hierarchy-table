import { useEffect } from "react"
import { ImCross } from "react-icons/im"

import "./App.css"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { CollapsibleTable } from "./components/CollapsibleTable"
import { JSON_FILE_PATH } from "./config"
import {
  deleteRow,
  fetchData,
  selectStatus,
  selectTableData,
} from "./features/hierarchyTable/hierarchyTableSlice"

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
      <h1>Hierarchy table</h1>
      {tableData ? (
        <CollapsibleTable
          data={tableData}
          rowActions={{
            headerText: "Actions",
            buttons: [
              {
                color: "#dd0000",
                content: <ImCross />,
                accessibilityLabel: "Delete row",
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
