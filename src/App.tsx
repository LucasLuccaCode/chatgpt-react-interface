import React from "react"
import { Container } from "./styles"

import { Header } from "./layouts/Header"
import { Sidebar } from "./layouts/Sidebar"
import { Main } from "./layouts/Main"
import { Settings } from "./layouts/Settings"
import { Footer } from "./layouts/Footer"

export const App: React.FC = () => {
  return (
    <Container>
      <Header />
      <Sidebar />
      <Main />
      <Settings />
      <Footer />
    </Container>
  )
}