import { SocialMediaStyled, SocialItem, SocialIcon } from './styles'

export const SocialMedia: React.FC = () => {
  return (
    <SocialMediaStyled>
      <SocialItem>
        <a href="#">
          <SocialIcon className="bi bi-facebook" />
        </a>
      </SocialItem>
      <SocialItem>
        <a href="#">
          <SocialIcon className="bi bi-google" />
        </a>
      </SocialItem>
      <SocialItem>
        <a href="#">
          <SocialIcon className="bi bi-github" />
        </a>
      </SocialItem>
    </SocialMediaStyled>
  )
}