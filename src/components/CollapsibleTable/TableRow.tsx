import { ActionButtons } from "./ActionButtons"
import { ToggleButton } from "./ToggleButton"
import { Cell, RowActions, RowId } from "./types"

type TableRowProps = {
  id: RowId
  isEven: boolean
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
  isEven,
  data,
  hasChildren,
  rowActions,
  isChildrenExpanded,
  onToggleChildrenVisible,
}: TableRowProps) {
  return (
    <tr className={isEven ? "darker" : ""}>
      <td>
        {hasChildren && (
          <ToggleButton
            isExpanded={isChildrenExpanded}
            onClick={onToggleChildrenVisible}
          />
        )}
      </td>
      {data.map((cell) => (
        <td>{cell}</td>
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
