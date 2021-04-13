import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import Button from '../components/Button'
import Steppers from '../components/Steppers'

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { paymentMethod } = cart

  if (paymentMethod === 'null') {
    history.push('/metode')
  }

  const style = {
    background: 'rgb(2 2 2)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    margin: '10px',
  }
  return (
    <Grid item xs={12} style={{ marginTop: 10 }}>
      <Link to='/ekspedisi'>
        <Button style={style}>Back</Button>
      </Link>
      <Steppers step='4' />
      <Card style={{ marginBottom: 65 }}>
        <CardContent>
          <Typography variant='h5' component='h1' style={{ marginBottom: 10 }}>
            Verifikasi :
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PlaceOrderScreen
