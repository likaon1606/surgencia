import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { InputGroup, FormControl } from 'react-bootstrap'

const SearchBar = ({ onChange, value }) => {
  return (
    <InputGroup className="position-relative">
      <FormControl
        type="search"
        placeholder="Buscar"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        className="rounded-3 border border-dark pl-4 d-none d-md-block"
        value={value}
        onChange={onChange}
      />
      <div className="position-absolute top-50 translate-middle-y end-0 p-2  d-md-none d-lg-block">
        <FaSearch className="text-gray" fill="grey" />
      </div>
    </InputGroup>
  )
}

export default SearchBar
