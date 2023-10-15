import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../../app/store"
import { RowId, TableFlatData } from "../../components/CollapsibleTable/types"
import { fetchDataFromJSON } from "../hierarchyTable/hierarchyTableAPI"
import { getDataWithoutRemovedRow, transformJsonDataToTableData } from "./utils"
import { HierarchyTableState } from "./types"

const EMPTY_FLAT_TABLE_DATA: TableFlatData = {
  0: {
    id: "0",
    data: [],
    childIds: [],
  },
}

const initialState: HierarchyTableState = {
  data: EMPTY_FLAT_TABLE_DATA,
  status: "idle",
}

export const fetchData = createAsyncThunk(
  "hierarchyTable/fetchData",
  async (url: string) => {
    return await fetchDataFromJSON(url) //Note: or try fetchDataFromFakeAPI(url) to see the loading better
  },
)

export const hierarchyTableSlice = createSlice({
  name: "hierarchyTable",
  initialState,
  reducers: {
    deleteFlatRow: (
      state,
      action: PayloadAction<{
        rowId: RowId
        parentRowId: RowId
      }>,
    ) => {
      state.data = getDataWithoutRemovedRow(
        state.data,
        action.payload.rowId,
        action.payload.parentRowId,
      )
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

export const { deleteFlatRow } = hierarchyTableSlice.actions

export const selectStatus = (state: RootState) => state.hierarchyTable.status
export const selectTableData = (state: RootState) => state.hierarchyTable.data

export default hierarchyTableSlice.reducer
