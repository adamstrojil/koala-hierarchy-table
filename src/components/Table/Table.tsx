import { Fragment, ReactNode, useState } from "react"
import { MdOutlineChevronRight, MdOutlineExpandMore } from "react-icons/md"

import { TableHead } from "./TableHead"
import { Cell, TableData } from "./types"
import { getHeaderVariantByLevel } from "./utils"

type Props = {
  data: TableData
  level?: number
  rowActions?: {
    headerText: string
    buttons: Array<{
      color: string
      content: ReactNode
      onClick: (rowId: string) => void
      accessibilityLabel?: string
    }>
  }
}

export const Table = ({ data, level = 0, rowActions }: Props) => {
  const [expadendRowIds, setExpandedRowIds] = useState<Array<string>>([])

  const hasRowActions = !!rowActions
  const headerCells: Array<Cell> = [
    "", //Note: Expand/collapse column label would go here
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
                    <button
                      aria-label={isChildrenExpanded ? "Collapse" : "Expand"}
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
                    >
                      <span>
                        {isChildrenExpanded ? (
                          <MdOutlineExpandMore />
                        ) : (
                          <MdOutlineChevronRight />
                        )}
                      </span>
                    </button>
                  )}
                </td>
                {rowData.map((cell) => (
                  <td key={crypto.randomUUID()}>{cell}</td>
                ))}
                {hasRowActions && (
                  <td>
                    {rowActions.buttons.map(
                      ({ content, onClick, color, accessibilityLabel }) => (
                        <button
                          aria-label={accessibilityLabel}
                          style={{ color }}
                          key={crypto.randomUUID()}
                          onClick={() => onClick(rowId)} //Note: could add some confirmation, window.confirm or smth
                        >
                          <span>{content}</span>
                        </button>
                      ),
                    )}
                  </td>
                )}
              </tr>
              {isChildrenExpanded && (
                //Note: I guess the nested table shouldn't be in a new row inside the parent table, but instead should exist in a completely separate table element.
                //      However, HTML validator doesn't complain about it, so unless someone does, I'll leave it like this.
                <tr>
                  <td colSpan={headerCells.length} className="nestedTable">
                    <Table
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
