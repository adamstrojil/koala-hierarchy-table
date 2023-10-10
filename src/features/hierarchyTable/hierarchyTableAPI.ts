import { Database } from "../../App"

// A mock function to mimic making an async request for data
export function fetchDataFromJSON(filePath: string): Promise<Database> {
  return new Promise<Database>((resolve) => {
    return setTimeout(() => {
      return resolve(
        fetch(filePath).then((response) => {
          return response.json()
        }),
      )
    }, 1) //Note: used only for simulating real API response and testing loading status
  })
}
