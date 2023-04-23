import { useMemo } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"

import { useSettings } from "../../contexts/settingsContext"
import { useAuth } from "../../contexts/authContext"
import { Toast } from "../../components/Toast"

import { ThemeProvider } from "styled-components"
import GlobalStyle from "../../styles/global"
import dark from "../../styles/themes/dark"
import light from "../../styles/themes/light"

import { RootContainer, Details, Navbar } from "./styles"
import { Dialog } from "../../components/Dialog"

const Root: React.FC = () => {
  const { settings } = useSettings()
  const { user, signOut } = useAuth()

  const theme = useMemo(() => {
    return settings.darkTheme ? dark : light
  }, [settings.darkTheme])

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <Navbar>
          <Link to="/" className="logo">
            <img src="/assets/icons/logo.png" alt="Logo da aplicação" />
          </Link>

          <ul>
            <li>
              <NavLink to="/">
                <i className="bi bi-house-door-fill"></i>
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink to={`${user.id}/chatbot`}>
                  <i className="bi bi-wechat"></i>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/search">
                <i className="bi bi-search"></i>
              </NavLink>
            </li>

            {!user && (
              <li>
                <NavLink to="/auth">
                  <i className="bi bi-person-fill-add"></i>
                </NavLink>
              </li>
            )}

            {user && (
              <>
                <li>
                  <NavLink to={`${user.id}/profile/prompts`}>
                    <i className="bi bi-person-fill"></i>
                  </NavLink>
                </li>
                <li>
                  <button onClick={signOut}>
                    <i className="bi bi-box-arrow-left"></i>
                  </button>
                </li>
              </>
            )}
          </ul>

          <NavLink to="/menu">
            <i className="bi bi-list"></i>
          </NavLink>
        </Navbar>

        <Details>
          <Outlet />
        </Details>

        <Toast />

        <Dialog />
      </RootContainer>

      <GlobalStyle />
    </ThemeProvider>
  )
}

export default Root