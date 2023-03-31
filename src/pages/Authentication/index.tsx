import { useState } from "react"
import { Container, Card } from "./styles"

import { InfoColumn } from "./InfoColumn"
import { FormColumn } from "./FormColumn"

export const Authentication: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Container>
      <Card isLogin={isLogin}>
        <InfoColumn isLogin={isLogin} setIsLogin={setIsLogin} />

        <FormColumn isLogin={isLogin} />
      </Card>
    </Container>
  )
}