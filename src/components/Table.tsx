import { Fragment, useState } from "react"
import { parseJsonDataToTableData } from "../App"

type Cell = string
type Row = { data: Array<Cell>; children: TableData }
type Headers = Array<Cell>
type Rows = Array<Row>

export type TableData = {
  headers: Headers
  rows: Rows
}

type Props = {
  data: TableData
  level?: number
}

function isObjectEmpty(obj: any) {
  return Object.entries(obj).length === 0
}

const INDEX_OF_ID_IN_ROW_CELLS = 0

const levelToBackgroundColorMap = {
  0: "#75e4b3",
  1: "#55DBCB",
  2: "#39A2AE",
  3: "#EEE",
}

export const Table = ({ data, level = 0 }: Props) => {
  const [expadendRowIDs, setExpandedRowIDs] = useState<Array<string>>([])

  return (
    <table
      style={{
        width: "1000px",
        textAlign: "center",
        marginLeft: level * 10 + "px",
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor:
              levelToBackgroundColorMap[Math.min(level, 3) as 0 | 1 | 2 | 3], //TODO fix
          }}
        >
          <th>expand</th>
          {data.headers.map((header: any, index: any) => (
            <th style={{ padding: "8px 8px" }} key={index}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row: any, rowIndex: any) => (
          <Fragment key={rowIndex}>
            <tr
              style={{
                backgroundColor: "#45382322",
              }}
            >
              <td>
                {!isObjectEmpty(row.children) ? (
                  expadendRowIDs.includes(
                    row.data[INDEX_OF_ID_IN_ROW_CELLS],
                  ) ? (
                    <button
                      onClick={() => {
                        setExpandedRowIDs((current) =>
                          current.filter(
                            (el) => el !== row.data[INDEX_OF_ID_IN_ROW_CELLS],
                          ),
                        )
                        // setIsChildExpanded(false)
                      }}
                    >
                      -
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        // setIsChildExpanded(true)
                        setExpandedRowIDs((current) => [
                          ...current,
                          row.data[INDEX_OF_ID_IN_ROW_CELLS],
                        ])
                      }}
                    >
                      +
                    </button>
                  )
                ) : (
                  ""
                )}
              </td>
              {row.data.map((cell: any, cellIndex: any) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>

            <tr>
              <td colSpan={data.headers.length + 1}>
                {/* Extra cell that spans all columns for sub-table*/}
                {!isObjectEmpty(row.children) &&
                expadendRowIDs.includes(row.data[INDEX_OF_ID_IN_ROW_CELLS]) ? (
                  <Table
                    data={parseJsonDataToTableData(
                      row.children[Object.keys(row.children)[0]].records,
                    )}
                    level={level + 1}
                  />
                ) : null}
              </td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  )
}
