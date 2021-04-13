import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CustomInput from '../components/CustomInput'
import Button from '../components/Button'

import { saveShippingAddress } from '../actions/cartActions'
import Steppers from '../components/Steppers'

const ShippingScreen = ({ history }) => {
  const style = {
    background: 'rgb(2 2 2)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    margin: '10px',
  }

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, seCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const handleChangeAddress = (e) => {
    setAddress(e.currentTarget.value)
  }
  const handleChangeCity = (e) => {
    setCity(e.currentTarget.value)
  }

  const handleChangePostalCode = (e) => {
    setPostalCode(e.currentTarget.value)
  }

  const handleChangeCountry = (e) => {
    seCountry(e.currentTarget.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/metode')
  }

  return (
    <Grid item xs={12} style={{ marginTop: 10 }}>
      <Link to='/cart'>
        <Button style={style}>Back</Button>
      </Link>
      <Steppers step='1' />
      <Card style={{ marginBottom: 65 }}>
        <CardContent>
          <Typography variant='h5' component='h1' style={{ marginBottom: 10 }}>
            Alamat Pengiriman :
          </Typography>
          <form className='form' onSubmit={submitHandler}>
            <CustomInput
              labelText='Alamat Lengkap'
              id='address'
              formControlProps={{
                fullWidth: true,
              }}
              handleChange={handleChangeAddress}
              type='text'
              value={address}
            />

            <CustomInput
              labelText='Kota'
              id='city'
              formControlProps={{
                fullWidth: true,
              }}
              handleChange={handleChangeCity}
              type='text'
              value={city}
            />
            <CustomInput
              labelText='Kode Pos'
              id='postalCode'
              formControlProps={{
                fullWidth: true,
              }}
              handleChange={handleChangePostalCode}
              type='text'
              value={postalCode}
            />
            <CustomInput
              labelText='Negara'
              id='country'
              formControlProps={{
                fullWidth: true,
              }}
              handleChange={handleChangeCountry}
              type='text'
              value={country}
            />
            <br />
            <Button
              type='submit'
              color='github'
              className='form__custom-button'
            >
              Lanjutkan
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ShippingScreen
