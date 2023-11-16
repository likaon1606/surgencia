import { useMemo, useRef, useState } from 'react'
import { createAutocomplete } from '@algolia/autocomplete-core'
import apiService from '../services/api.service'

export const useAutocomplete = (props) => {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    isOpen: false,
  })

  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        placeholder: 'Buscar',
        onStateChange: ({ state }) => setAutocompleteState(state),
        getSources: () => [
          {
            sourceId: 'results-surgencia-api',
            getItems: ({ query }) => {
              if (!!query) {
                return apiService.get(`/search?keyword=${query}&perPage=5`).then(res => res.data.results)
              }
            },
          },
        ],
        ...props,
      }),
    [props],
  )

  const formRef = useRef(null)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  const formProps = autocomplete.getFormProps({
    inputElement: inputRef.current,
  })
  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  })

  return {
    formRef,
    formProps,
    inputRef,
    inputProps,
    panelRef,
    autocompleteState,
    autocomplete
  }
}
