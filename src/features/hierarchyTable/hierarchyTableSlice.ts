import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Optional } from "../../app/types"
import { TableData } from "../../components/Table/types"
import { fetchDataFromJSON } from "../hierarchyTable/hierarchyTableAPI"
import {
  getDataWithoutItemsWithEmptyRows,
  getRowsWithoutRemoved,
  transformJsonDataToTableData,
} from "./utils"

export type HierarchyTableState = {
  data: Optional<TableData>
  status: "idle" | "loading" | "failed"
}

const initialState: HierarchyTableState = {
  data: null, //Note: With more time, I'd consider {headers:[], rows:[]} as initial state
  status: "idle",
}

export const fetchData = createAsyncThunk(
  "hierarchyTable/fetchData",
  async (url: string) => {
    return await fetchDataFromJSON(url) //Note: try fetchDataFromFakeAPI(url) to see the loading better
  },
)

export const hierarchyTableSlice = createSlice({
  name: "hierarchyTable",
  initialState,
  reducers: {
    deleteRow: (state, action: PayloadAction<{ rowId: string }>) => {
      if (state.data) {
        state.data.rows = getRowsWithoutRemoved(
          state.data.rows,
          action.payload.rowId,
        )
        state.data = getDataWithoutItemsWithEmptyRows(state.data)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "idle"
        state.data = transformJsonDataToTableData(action.payload)
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { deleteRow } = hierarchyTableSlice.actions

export const selectStatus = (state: RootState) => state.hierarchyTable.status
export const selectTableData = (state: RootState) => state.hierarchyTable.data

export default hierarchyTableSlice.reducer
