import { Actions, Button } from "./styles"

export const SidebarActions: React.FC = () => {
  return (
    <Actions>
      <Button>
        <i className="bi bi-plus" />
        <span>Novo</span>
      </Button>
      <Button>
        <i className="bi bi-dash" />
        <span>Remover</span>
      </Button>
    </Actions>
  )
}