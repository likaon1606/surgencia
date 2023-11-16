import React from 'react'
import { Form } from 'react-bootstrap'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'

export const Input = ({ label, name, type = 'text', control }) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  })

  return (
    <Form.Group className="mb-1">
      <Form.Label htmlFor={name} className="mb-0">
        {label}
      </Form.Label>
      <Form.Control type={type} {...field} />
      <Form.Text className="text-danger">{errors?.[name]?.message}</Form.Text>
    </Form.Group>
  )
}

Input.propTypes = {
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
}
