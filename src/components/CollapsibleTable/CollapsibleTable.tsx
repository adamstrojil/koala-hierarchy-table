import { useState } from "react"

import { TableFlatData, TableFlatDataNode, RowActions, RowIds } from "./types"
import { TableHead } from "./TableHead"
import { TableRow } from "./TableRow"

type Props = {
  data: TableFlatData
  rootNode?: TableFlatDataNode
  rowActions?: RowActions
}

const TOGGLE_COLUMN_LABEL = ""

export const CollapsibleTable = ({
  data,
  rowActions,
  rootNode = data[Object.keys(data)[0]],
}: Props) => {
  const [expadendRowIds, setExpandedRowIds] = useState<RowIds>([])
  const hasRowActions = !!rowActions

  return (
    <table>
      {rootNode.childIds.map((id, index) => {
        const currentNode = data[id]
        const headerCells = [
          TOGGLE_COLUMN_LABEL,
          ...currentNode.data,
          ...(hasRowActions ? [rowActions.headerText] : []),
        ]
        const isHeaderRow = index === 0 // the first child in a list is always considered the table header
        const numberOfColumns = headerCells.length
        const hasChildren = !!currentNode.childIds.length
        const isChildrenExpanded = hasChildren && expadendRowIds.includes(id)
        const handleRowToggle = () =>
          setExpandedRowIds((expandedIds) =>
            expandedIds.includes(id)
              ? expandedIds.filter((expandedId) => expandedId !== id)
              : [id, ...expandedIds],
          )

        return isHeaderRow ? (
          <TableHead key={id} cells={headerCells} />
        ) : (
          <tbody key={id}>
            <TableRow
              id={id}
              parentId={rootNode.id}
              data={currentNode.data}
              hasChildren={hasChildren}
              rowActions={rowActions}
              isChildrenExpanded={isChildrenExpanded}
              onToggleChildrenVisible={handleRowToggle}
            />
            {isChildrenExpanded && (
              <tr>
                <td colSpan={numberOfColumns} className="nestedTable">
                  <CollapsibleTable
                    rootNode={currentNode}
                    data={data}
                    rowActions={rowActions}
                  />
                </td>
              </tr>
            )}
          </tbody>
        )
      })}
    </table>
  )
}
