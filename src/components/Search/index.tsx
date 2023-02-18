import React, { useState, FormEvent } from "react"

import { Button, SearchForm, InputSearch } from "./styles"

export const Search: React.FC = () => {
  const [chatSearch, setChatSearch] = useState("")

  const handleSearchChat = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    console.log(chatSearch)
  }

  return (
    <SearchForm onSubmit={handleSearchChat}>
      <InputSearch name="search" onChange={e => setChatSearch(e.target.value)} />
      <Button type="submit">
        <i className="bi bi-search" />
      </Button>
    </SearchForm>
  )
}