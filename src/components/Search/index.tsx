import React, { FormEvent } from "react"

import { SearchForm, InputSearch, Button } from "./styles"

interface SearchProps {
  filter: string,
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

export const Search: React.FC<SearchProps> = ({ filter, setFilter }) => {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const { search } = Object.fromEntries(formData)

    setFilter(String(search))
  }

  return (
    <SearchForm onSubmit={handleFormSubmit}>
      <InputSearch
        type="search"
        name="search"
        value={filter}
        placeholder="Filtre por algum chat"
        onChange={e => setFilter(e.target.value)}
      />
      <Button type="submit">
        <i className="bi bi-search" />
      </Button>
    </SearchForm>
  )
}