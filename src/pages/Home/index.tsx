import { Feed, HomeContainer, Title } from "./styles"

import { PromptForm } from "../../components/PromptForm"
import { Prompts } from "../../components/Prompts"
import { NewUsers } from "./NewUsers"

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Feed>
        <Title>
          Prompts
        </Title>

        <PromptForm />

        <Prompts type="all" />
      </Feed>

      <NewUsers />
    </HomeContainer>
  )
}

export default Home