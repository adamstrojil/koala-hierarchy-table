import { Fragment, useState } from "react"

import { ToggleButton } from "./ToggleButton"
import { ActionButtons } from "./ActionButtons"
import { TableHead } from "./TableHead"
import { Cell, RowActions, RowId, TableData } from "./types"
import { getHeaderVariantByLevel } from "./utils"

type Props = {
  data: TableData
  level?: number
  rowActions?: RowActions
}
const TOGGLE_COLUMN_LABEL = ""

export const CollapsibleTable = ({ data, level = 0, rowActions }: Props) => {
  const [expadendRowIds, setExpandedRowIds] = useState<Array<RowId>>([])

  const hasRowActions = !!rowActions
  const headerCells: Array<Cell> = [
    TOGGLE_COLUMN_LABEL,
    ...data.headers,
    ...(hasRowActions ? [rowActions.headerText] : []),
  ]

  return (
    <table>
      <TableHead
        colorVariant={getHeaderVariantByLevel(level)}
        cells={headerCells}
      />
      <tbody>
        {data.rows.map(({ data: rowData, rowId, children }) => {
          const hasChildren = !!children
          const isChildrenExpanded =
            hasChildren && expadendRowIds.includes(rowId)

          return (
            <Fragment key={rowId}>
              <tr>
                <td>
                  {hasChildren && (
                    <ToggleButton
                      isExpanded={isChildrenExpanded}
                      onClick={() => {
                        setExpandedRowIds((currentlyExpanded) =>
                          isChildrenExpanded
                            ? currentlyExpanded.filter(
                                //Note: could be optimised by not using filter and stopping after the id was found (and removed)
                                (id) => id !== rowId,
                              )
                            : [rowId, ...currentlyExpanded],
                        )
                      }}
                    />
                  )}
                </td>
                {rowData.map((cell) => (
                  <td key={crypto.randomUUID()}>{cell}</td>
                ))}
                {hasRowActions && (
                  <td>
                    <ActionButtons buttons={rowActions.buttons} rowId={rowId} />
                  </td>
                )}
              </tr>
              {isChildrenExpanded && (
                //Note: I guess the nested table shouldn't be in a new row inside the parent table, but instead should exist in a completely separate table element elsewhere.
                //      However, HTML validator doesn't complain about it, so unless someone does, I'll leave it like this.
                <tr>
                  <td colSpan={headerCells.length} className="nestedTable">
                    <CollapsibleTable
                      level={level + 1}
                      data={children}
                      rowActions={rowActions}
                    />
                  </td>
                </tr>
              )}
            </Fragment>
          )
        })}
      </tbody>
    </table>
  )
}
