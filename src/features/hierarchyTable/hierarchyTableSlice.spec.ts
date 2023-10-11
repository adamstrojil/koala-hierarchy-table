// import hierarchyTableReducer, {
//   HierarchyTableState,
//   deleteRow
// } from "./hierarchyTableSlice"

// describe("hierarchyTable reducer", () => {
//   const initialState: HierarchyTableState = {
//     value: 3,
//     status: "idle",
//   }
//   it("should handle initial state", () => {
//     expect(hierarchyTableReducer(undefined, { type: "unknown" })).toEqual({
//       value: 0,
//       status: "idle",
//     })
//   })

//   it("should handle delete row", () => {
//     const actual = hierarchyTableReducer(initialState, increment())
//     expect(actual.value).toEqual(4)
//   })

//   it("should handle delete nested row", () => {
//     const actual = hierarchyTableReducer(initialState, decrement())
//     expect(actual.value).toEqual(2)
//   })

// })
