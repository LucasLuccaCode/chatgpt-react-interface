import { useMemo } from "react"
import { Link, NavLink, Outlet } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import { useSettings } from "../../contexts/settingsContext"

import GlobalStyle from "../../styles/global"
import dark from "../../styles/themes/dark"
import light from "../../styles/themes/light"

import { RootContainer, Details, Navbar } from "./styles"

export const Root: React.FC = () => {
  const { settings } = useSettings()

  const theme = useMemo(() => {
    return settings.darkTheme ? dark : light
  }, [settings.darkTheme])

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <Navbar>
          <Link to="/" className="logo">
            <img src="assets/icons/logo.png" alt="Logo da aplicação" />
          </Link>

          <ul>
            <li>
              <NavLink to="/">
                <i className="bi bi-house-door-fill"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="/chatbot">
                <i className="bi bi-wechat"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="/search">
                <i className="bi bi-search"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <i className="bi bi-person-fill"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout">
                <i className="bi bi-box-arrow-left"></i>
              </NavLink>
            </li>
          </ul>

          <NavLink to="/menu">
            <i className="bi bi-list"></i>
          </NavLink>
        </Navbar>

        <Details>
          <Outlet />
        </Details>
      </RootContainer>

      <GlobalStyle />
    </ThemeProvider>
  )
}