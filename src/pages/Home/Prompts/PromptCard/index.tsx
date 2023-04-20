import {
  Reactions,
  Avatar,
  Content,
  Description,
  Name,
  More,
  PromptCardStyled,
} from "./styles"

export const PromptCard: React.FC = () => {
  return (
    <PromptCardStyled>
      <Avatar />

      <Content>
        <Name>John Programmer</Name>
        <Description>Se comporte como um professor de Inglês com doutorado em Harvard.</Description>
        <Reactions>
          <button className="like">
            <i className="bi bi-heart" />
          </button>
          <button className="favorite">
            <i className="bi bi-star" />
          </button>
          <button className="share">
            <i className="bi bi-share-fill" />
          </button>
        </Reactions>
      </Content>

      <More>
        <i className="bi bi-three-dots" />
      </More>
    </PromptCardStyled>
  )
}