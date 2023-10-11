type Data = { ID: string; [key: string]: string }
type EmptyObject = Record<string, never>

export type JSONDatabaseNode = {
  data: Data
  children: Children
}
export type Children =
  | EmptyObject
  | {
      [key: string]: {
        // "has_nemesis", "has_secrete"
        records: Array<JSONDatabaseNode>
      }
    }

export type JSONDatabase = Array<JSONDatabaseNode>
