import { Feed, Header, HomeContainer, Main, Title } from "./styles"

import { PromptForm } from "../../components/PromptForm"
import { Prompts } from "../../components/Prompts"
import { RecentUsers } from "./RecentUsers"

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Feed>
        <Header>
          <Title>Prompts</Title>
        </Header>

        <Main>
          <PromptForm />

          <Prompts type="all" />
        </Main>

      </Feed>

      <RecentUsers />
    </HomeContainer>
  )
}

export default Home