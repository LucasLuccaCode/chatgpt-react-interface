import { Feed, HomeContainer, Title } from "./styles"

import { PromptForm } from "../../components/PromptForm"
import { Prompts } from "./Prompts"
import { NewUsers } from "./NewUsers"

export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Feed>
        <Title>
          Home Page
        </Title>

        <PromptForm />

        <Prompts />
      </Feed>

      <NewUsers />
    </HomeContainer>
  )
}