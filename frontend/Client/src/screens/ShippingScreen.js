import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CustomInput from '../components/CustomInput'
import Button from '../components/Button'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

import { saveShippingAddress } from '../actions/cartActions'
import Steppers from '../components/Steppers'
import {
  listCityId,
  listProvinceId,
  listSubDistrictId,
} from '../actions/postalAction'

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch()

  const postalProvince = useSelector((state) => state.postalProvince)
  const { loading, error, province } = postalProvince

  const postalCity = useSelector((state) => state.postalCity)
  const {
    loading: loadingCity,
    error: errorCityList,
    city: getCityList,
  } = postalCity

  const postalSubDistrict = useSelector((state) => state.postalSubDistrict)
  const {
    loading: loadingPostalSubDistrict,
    error: errorPostalSubDistrictList,
    // success,
    subdistrict: getPostalSubDistrictList,
  } = postalSubDistrict

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [nameHold, setnameHold] = useState('')
  const [address, setAddress] = useState('')
  const [provinceSelected, setProvince] = useState([''])
  const [city, setCity] = useState([''])
  const [subDisctrict, setSubDisctrict] = useState([''])
  // const [postalCode, setPostalCode] = useState('')
  // const [country, setCountry] = useState('')
  const [selectedValue, setSelectedValue] = useState(1)
  const [newAddress, setNewAddress] = useState(false)

  useEffect(() => {
    dispatch(listProvinceId())
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        nameHold,
        address,
        provinceSelected,
        city,
        subDisctrict,
        // postalCode,
        // country,
      })
    )
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
      <Link to='/cart'>
        <Button style={style}>Back</Button>
      </Link>
      <Steppers step='1' />
      <Card style={{ marginBottom: 65 }}>
        <CardContent>
          <Typography variant='h5' component='h1' style={{ marginBottom: 10 }}>
            Alamat Pengiriman :
          </Typography>
          <>
            <FormControl style={{ width: '100%' }}>
              <InputLabel id='demo-simple-select-label'>
                Alamat Sebelumnya
              </InputLabel>
              {/* {[...Array(stok).keys()].map((x) => x + 1)} */}
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={selectedValue}
                onChange={(e) => {
                  if (e.target.value !== 'PilihBaru') {
                    setNewAddress(false)
                    setSelectedValue(e.target.value)
                  } else {
                    setNewAddress(true)
                    setSelectedValue(e.target.value)
                  }
                }}
              >
                <MenuItem key='0' value='1'>
                  Alamat Terakhir Digunakan
                </MenuItem>
                <MenuItem key='1' value='PilihBaru'>
                  Pilih Baru
                </MenuItem>
              </Select>
            </FormControl>
          </>

          {newAddress ? (
            <>
              {' '}
              <form className='form' onSubmit={submitHandler}>
                <CustomInput
                  labelText='Atas Nama'
                  id='nameHolder'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    autoComplete: 'new-password',
                  }}
                  handleChange={(e) => setnameHold(e.currentTarget.value)}
                  type='text'
                  value={nameHold}
                />

                <CustomInput
                  labelText='Alamat Lengkap'
                  id='address'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    autoComplete: 'new-password',
                  }}
                  handleChange={(e) => setAddress(e.currentTarget.value)}
                  type='text'
                  value={address}
                />

                {loading ? (
                  <Loader />
                ) : (
                  <>
                    {error && (
                      <Message
                        severity='error'
                        childern={error}
                        style={{ textAlign: 'left' }}
                      />
                    )}
                    <Autocomplete
                      id='provinsi'
                      freeSolo
                      options={province}
                      getOptionLabel={(option) => option.province}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Provinsi'
                          margin='normal'
                          variant='outlined'
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setProvince(newValue)
                          dispatch(listCityId(newValue.province_id))
                        } else {
                          setProvince('')
                        }
                      }}
                    />
                  </>
                )}

                {loadingCity ? (
                  <Loader />
                ) : (
                  <>
                    {errorCityList && (
                      <Message
                        severity='error'
                        childern={errorCityList}
                        style={{ textAlign: 'left' }}
                      />
                    )}
                    <Autocomplete
                      id='kota'
                      freeSolo
                      disabled={getCityList.length === 0 ? true : false}
                      options={getCityList}
                      getOptionLabel={(option) =>
                        `${option.type}${' '}${option.city_name}`
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Kota'
                          margin='normal'
                          variant='outlined'
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setCity(newValue)
                          if (newValue.city_id) {
                            dispatch(listSubDistrictId(newValue.city_id))
                          }
                        } else {
                          setCity('')
                        }
                      }}
                    />
                  </>
                )}

                {loadingPostalSubDistrict ? (
                  <Loader />
                ) : (
                  <>
                    {errorPostalSubDistrictList && (
                      <Message
                        severity='error'
                        childern={errorPostalSubDistrictList}
                        style={{ textAlign: 'left' }}
                      />
                    )}
                    <Autocomplete
                      id='kecamatan'
                      freeSolo
                      options={getPostalSubDistrictList}
                      disabled={
                        getPostalSubDistrictList.length === 0 ? true : false
                      }
                      getOptionLabel={(option) => option.subdistrict_name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label='Kecamatan'
                          margin='normal'
                          variant='outlined'
                        />
                      )}
                      onChange={(event, newValue) => {
                        if (newValue) {
                          setSubDisctrict(newValue)
                        } else {
                          setSubDisctrict('')
                        }
                      }}
                    />
                  </>
                )}
                <Button
                  type='submit'
                  color='github'
                  className='form__custom-button'
                >
                  Lanjutkan
                </Button>
              </form>
            </>
          ) : (
            <>
              <CustomInput
                labelText='Atas Nama'
                id='nameHolder'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                type='text'
                value={shippingAddress.nameHold}
                disabled={true}
              />

              <CustomInput
                labelText='Alamat Lengkap'
                id='address'
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  autoComplete: 'new-password',
                }}
                type='text'
                value={shippingAddress.address}
                disabled={true}
              />
              <Autocomplete
                id='provinsi'
                freeSolo
                options={province}
                disabled={true}
                inputValue={shippingAddress.provinceSelected.province}
                getOptionLabel={(option) => option.province}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Provinsi'
                    margin='normal'
                    variant='outlined'
                  />
                )}
              />
              <Autocomplete
                id='kota'
                freeSolo
                disabled={true}
                options={getCityList}
                inputValue={shippingAddress.city.city_name}
                getOptionLabel={(option) =>
                  `${option.type}${' '}${option.city_name}`
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Kota'
                    margin='normal'
                    variant='outlined'
                  />
                )}
              />
              <Autocomplete
                id='kecamatan'
                freeSolo
                options={getPostalSubDistrictList}
                disabled={true}
                getOptionLabel={(option) => option.subdistrict_name}
                inputValue={shippingAddress.subDisctrict.subdistrict_name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Kecamatan'
                    margin='normal'
                    variant='outlined'
                  />
                )}
              />
              <Button
                type='submit'
                color='github'
                className='form__custom-button'
                onClick={() => history.push('/metode')}
              >
                Lanjutkan
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ShippingScreen
