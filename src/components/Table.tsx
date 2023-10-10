import { Fragment, useState } from "react"

type Cell = string
type Row = { data: Array<Cell>; children: TableData | null; rowId: string }
export type Headers = Array<Cell>
export type Rows = Array<Row>

export type TableData = {
  headers: Headers
  rows: Rows
}

type Props = {
  data: TableData
  level?: number
  rowActions?: {
    headerText: string
    buttons: Array<{ text: string; onClick: (rowId: string) => void }>
  }
}

const INDEX_OF_ID_IN_ROW_CELLS = 0

const levelToBackgroundColorMap = {
  0: "#75e4b3",
  1: "#55DBCB",
  2: "#39A2AE",
  3: "#EEE",
}

export const Table = ({ data, level = 0, rowActions }: Props) => {
  const [expadendRowIDs, setExpandedRowIDs] = useState<Array<string>>([])

  if (data.rows.length === 0 && level === 0) {
    return "No data to display..."
  }

  if (data.rows.length === 0) {
    return null
  }

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
          <th>{rowActions?.headerText}</th>
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
                {row.children ? (
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
              <td>
                {rowActions?.buttons.map(({ text, onClick }) => (
                  <button key={text} onClick={() => onClick(row.rowId)}>
                    {text}
                  </button>
                ))}
              </td>
              {row.data.map((cell: any, cellIndex: any) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>

            <tr>
              <td colSpan={data.headers.length + 1}>
                {/* Extra cell that spans all columns for nested child table*/}
                {row.children &&
                expadendRowIDs.includes(row.data[INDEX_OF_ID_IN_ROW_CELLS]) ? (
                  <Table
                    data={row.children}
                    level={level + 1}
                    rowActions={rowActions}
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
