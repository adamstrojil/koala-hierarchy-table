import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../../app/store"
import { Optional } from "../../app/types"
import { TableData } from "../../components/CollapsibleTable/types"
import { fetchDataFromJSON } from "../hierarchyTable/hierarchyTableAPI"
import { getDataWithoutRemovedRow, transformJsonDataToTableData } from "./utils"

export type HierarchyTableState = {
  data: Optional<TableData>
  status: "idle" | "loading" | "failed"
}

const initialState: HierarchyTableState = {
  data: null, //Note: With more time, I'd consider if {headers:[], rows:[]} is better default state
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
        state.data = getDataWithoutRemovedRow(state.data, action.payload.rowId)
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
