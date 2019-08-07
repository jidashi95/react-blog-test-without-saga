import React from 'react'
import { Alert } from "react-bootstrap"
export default ({errors}) => (
  Array.isArray(errors) ?
  errors.map((msg, idx) => <Alert key={idx} bsStyle="danger">
    {msg}
  </Alert>) : <Alert bsStyle="danger" dismissible>
    Unknown error
  </Alert>
)