import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'

const Message = ({ severity, childern }) => {
  function ucfirst(str) {
    var firstLetter = str.substr()
    return firstLetter.toUpperCase()
  }
  return (
    <>
      <Alert severity={severity}>
        <AlertTitle>{ucfirst(severity)}</AlertTitle>
        {childern}
      </Alert>
    </>
  )
}

Message.defaultProps = {
  severity: 'info',
}
export default Message
