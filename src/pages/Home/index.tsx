import { Feed, HomeContainer, Title } from "./styles"

import { PromptForm } from "../../components/PromptForm"
import { Prompts } from "../../components/Prompts"
import { NewUsers } from "./NewUsers"

export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Feed>
        <Title>
          Prompts
        </Title>

        <PromptForm />

        <Prompts />
      </Feed>

      <NewUsers />
    </HomeContainer>
  )
}