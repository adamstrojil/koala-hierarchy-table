import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import hierarchyTableReducer from "../features/hierarchyTable/hierarchyTableSlice"

export const store = configureStore({
  reducer: {
    hierarchyTable: hierarchyTableReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
