import { MdOutlineChevronRight, MdOutlineExpandMore } from "react-icons/md"

type Props = {
  onClick: () => void
  isExpanded: boolean
}

export function ToggleButton({ isExpanded, onClick }: Props) {
  return (
    <button aria-label={isExpanded ? "Collapse" : "Expand"} onClick={onClick}>
      <span>
        {isExpanded ? <MdOutlineExpandMore /> : <MdOutlineChevronRight />}
      </span>
    </button>
  )
}
