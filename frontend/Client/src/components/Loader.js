import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Loader = () => {
  return (
    <div style={{ textAlign: 'center', margin: 30 }}>
      <CircularProgress style={{ width: 90, height: 'auto' }} />
    </div>
  )
}

export default Loader
