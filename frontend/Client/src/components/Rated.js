import React from 'react'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'

const Rated = ({ value, text, classname }) => {
  return (
    <>
      {classname === 'countReview' ? (
        <>
          <Box
            component='fieldset'
            mb={3}
            borderColor='transparent'
            style={{
              position: 'relative',
              marginLeft: '-10px',
              fontSize: 13,
              background: '#ffffffcc',
            }}
          >
            <Rating precision={0.5} value={value} readOnly />
            <span className={classname}>{text && text}</span>
          </Box>
        </>
      ) : (
        <>
          <Box component='fieldset' mb={3} borderColor='transparent'>
            <Rating
              precision={0.5}
              value={value}
              readOnly
              className='marating'
            />
            <p className={classname}>{text && text}</p>
          </Box>
        </>
      )}
    </>
  )
}

export default Rated
