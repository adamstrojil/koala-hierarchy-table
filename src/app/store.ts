import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import hierarchyTableReducer from "../features/hierarchyTable/hierarchyTableSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
