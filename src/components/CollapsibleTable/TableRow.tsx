import { ActionButtons } from "./ActionButtons"
import { ToggleButton } from "./ToggleButton"
import { Cell, RowActions, RowId } from "./types"

type TableRowProps = {
  id: RowId
  parentId: RowId
  data: Array<Cell>
  hasChildren: boolean
  isChildrenExpanded: boolean
  rowActions?: RowActions
  onToggleChildrenVisible: () => void
}

export function TableRow({
  id,
  parentId,
  data,
  hasChildren,
  rowActions,
  isChildrenExpanded,
  onToggleChildrenVisible,
}: TableRowProps) {
  return (
    <tr>
      <td>
        {hasChildren && (
          <ToggleButton
            isExpanded={isChildrenExpanded}
            onClick={onToggleChildrenVisible}
          />
        )}
      </td>
      {data.map((cell) => (
        <td key={crypto.randomUUID()}>{cell}</td>
      ))}
      {!!rowActions && (
        <td>
          <ActionButtons
            buttons={rowActions.buttons}
            parentId={parentId}
            rowId={id}
          />
        </td>
      )}
    </tr>
  )
}
