import { InputGroup } from 'react-bootstrap'
import { MdSearch } from 'react-icons/md'
import { useAutocomplete } from '../../hooks/useAutocomplete'
import AutocompleteResults from './AutocompleteResults'

export default function AutocompleteSearch(props) {
  const { autocomplete, autocompleteState, formProps, inputProps, formRef, inputRef, panelRef } = useAutocomplete(props)

  return (
    <form ref={formRef} className="position-relative p-1 mx-auto" {...formProps} style={{ maxWidth: '400px' }}>
      <InputGroup className="d-flex flex-nowrap justify-content-end">
        <input ref={inputRef} className="py-2 pl-4 form-control" aria-describedby="search-addon" {...inputProps} />
        <InputGroup.Text id="search-addon" className={`rounded-end`}>
          <MdSearch />
        </InputGroup.Text>
      </InputGroup>
      {autocompleteState.isOpen && (
        <AutocompleteResults autocomplete={autocomplete} autocompleteState={autocompleteState} panelRef={panelRef} />
      )}
    </form>
  )
}
