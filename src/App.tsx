import { useEffect } from "react"
import { ImCross } from "react-icons/im"

import "./App.css"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { CollapsibleTable } from "./components/CollapsibleTable"
import { RowActions } from "./components/CollapsibleTable/types"
import { JSON_FILE_PATH } from "./config"
import {
  deleteFlatRow,
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

  const rootNode = tableData[Object.keys(tableData)[0]]
  const hasDataToDisplay = !!rootNode.childIds.length
  const rowActions: RowActions = {
    headerText: "Actions",
    buttons: [
      {
        color: "#dd0000",
        content: <ImCross />,
        accessibilityLabel: "Delete row",
        onClick: (rowId, parentRowId) => {
          dispatch(deleteFlatRow({ rowId, parentRowId }))
        },
      },
    ],
  }

  return (
    <>
      <h1>Hierarchy table</h1>
      {hasDataToDisplay ? (
        <CollapsibleTable data={tableData} rowActions={rowActions} />
      ) : (
        "No data to display..."
      )}
    </>
  )
}
