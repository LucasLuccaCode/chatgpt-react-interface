import { useState } from "react"

import { Icon } from "../ChatContent/ChatMessage/styles"
import { StyledCopyButton } from "./styles"

interface CopyButtonProps {
  answer: string
}

export const CopyButton: React.FC<CopyButtonProps> = ({ answer }) => {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    if(copied) return
    
    navigator.clipboard.writeText(answer)

    setCopied(true)

    setTimeout(() => setCopied(false), 5000)
  }

  return (
    <StyledCopyButton onClick={handleClick}>
      <Icon className={`bi bi-${copied ? 'clipboard-check' : 'clipboard'} `} />
    </StyledCopyButton>
  )
}  