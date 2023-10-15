import { ActionButton, RowId } from "./types"

type Props = {
  buttons: Array<ActionButton>
  rowId: RowId
  parentId: RowId
}

export function ActionButtons({ buttons, rowId, parentId }: Props) {
  return buttons.map(({ content, onClick, color, accessibilityLabel }) => (
    <button
      aria-label={accessibilityLabel}
      style={{ color }}
      key={crypto.randomUUID()}
      onClick={() => onClick(rowId, parentId)} //Note: could add some confirmation before deleting, like window.confirm or smth
    >
      <span>{content}</span>
    </button>
  ))
}
