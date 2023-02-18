import React, { useState, FormEvent } from "react"

import { SearchForm, InputSearch, Button } from "./styles"

export const Search: React.FC = () => {
  const [chatSearch, setChatSearch] = useState("")

  const handleSearchChat = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    console.log(chatSearch)
  }

  return (
    <SearchForm onSubmit={handleSearchChat}>
      <InputSearch 
        type="search" 
        name="search" 
        onChange={e => setChatSearch(e.target.value)} 
      />
      <Button type="submit">
        <i className="bi bi-search" />
      </Button>
    </SearchForm>
  )
}