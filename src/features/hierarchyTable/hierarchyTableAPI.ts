import { JSONDatabase } from "./types"

export function fetchDataFromFakeAPI(filePath: string): Promise<JSONDatabase> {
  //Note: used only for simulating real API response and testing loading status
  return new Promise<JSONDatabase>((resolve) => {
    return setTimeout(() => {
      return resolve(
        fetch(filePath).then((response) => {
          return response.json()
        }),
      )
    }, 2000)
  })
}

export async function fetchDataFromJSON(
  filePath: string,
): Promise<JSONDatabase> {
  const response = await fetch(filePath)
  return await response.json()
}
