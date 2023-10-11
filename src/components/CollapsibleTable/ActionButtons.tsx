import { ActionButton, RowId } from "./types"

type Props = {
  buttons: Array<ActionButton>
  rowId: RowId
}

export function ActionButtons({ buttons, rowId }: Props) {
  return buttons.map(({ content, onClick, color, accessibilityLabel }) => (
    <button
      aria-label={accessibilityLabel}
      style={{ color }}
      key={crypto.randomUUID()}
      onClick={() => onClick(rowId)} //Note: could add some confirmation before deleting, like window.confirm or smth
    >
      <span>{content}</span>
    </button>
  ))
}
