import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import Button from '../components/Button'
import Steppers from '../components/Steppers'
import Loader from '../components/Loader'

import { listCostDelivery } from '../actions/postalAction'
import { saveServiceDeliveryMethod } from '../actions/cartActions'

const DeliveryScreen = ({ history }) => {
  function rupiahConvert(nominal) {
    const bilangan = nominal

    var number_string = bilangan.toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{1,3}/gi)

    if (ribuan) {
      const separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }
    rupiah = split[1] !== undefined ? rupiah + ',-' + split[1] : rupiah

    return rupiah
  }

  const dispatch = useDispatch()

  const [choosenVendor, setChoosenVendor] = useState('')

  const [expanded, setExpanded] = useState('')
  const [value, setValue] = useState('female')

  const handleChangeService = (event) => {
    setValue(event.target.value)
    setChoosenVendor(event.target.value)
  }

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const cart = useSelector((state) => state.cart)
  const { cartItems, paymentMethod, shippingAddress } = cart

  const costDelivery = useSelector((state) => state.costDelivery)
  const { listCostDeliveryData, loading } = costDelivery

  useEffect(() => {
    if (!paymentMethod) {
      history.push('/metode')
    }
    if (cartItems.length === 0) {
      history.push('/cart')
    }
    const requiredData = {
      destination: shippingAddress.subDisctrict.subdistrict_id,
      destinationType: shippingAddress.subDisctrict.type,
      weight: 100,
    }

    dispatch(listCostDelivery(requiredData))
  }, [dispatch, shippingAddress, history, paymentMethod, cartItems])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveServiceDeliveryMethod(choosenVendor))
    history.push('/verifikasi')
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

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails)

  const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion)

  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary)

  const returnHandler = () => {
    history.goBack()
  }

  return (
    <Grid item xs={12} style={{ marginTop: 10 }}>
      <Button style={style} onClick={returnHandler}>
        Back
      </Button>
      <Steppers step='3' />
      <Card style={{ marginBottom: 65 }}>
        <CardContent>
          <Typography variant='h5' component='h1' style={{ marginBottom: 10 }}>
            Pilih Ekspedisi :
          </Typography>

          {loading ? (
            <Loader />
          ) : listCostDeliveryData ? (
            listCostDeliveryData.map((listCostValue, key) => (
              <Accordion
                square
                expanded={expanded === `panel${key}`}
                onChange={handleChange(`panel${key}`)}
                key={listCostValue.code}
              >
                <AccordionSummary
                  aria-controls={`panel${key}d-content`}
                  id={`panel${key}d-header`}
                  key={`panel${key}`}
                >
                  <Typography key={listCostValue.name}>
                    {listCostValue.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails key={listCostValue.code}>
                  <Grid container>
                    {listCostValue.costs.map((listServices, key) => (
                      <Grid item xs={12} key={key}>
                        <FormControl component='fieldset' key={key}>
                          <RadioGroup
                            aria-label='services'
                            name='services'
                            value={value}
                            onChange={handleChangeService}
                            key={key}
                          >
                            <FormControlLabel
                              value={`${listServices.service}-${listCostValue.code}-${listServices.cost[0].value}`}
                              control={<Radio />}
                              label={`${
                                listServices.description
                              }${' '}-${' '}${rupiahConvert(
                                listServices.cost[0].value
                              )}${' '}-${' '}${
                                listServices.cost[0].etd
                              }${' '}(hari)`}
                              key={key}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <></>
          )}
        </CardContent>
        <Button
          type='submit'
          color='github'
          className='form__custom-button'
          style={{ margin: 10 }}
          onClick={submitHandler}
        >
          Lanjutkan
        </Button>
      </Card>
    </Grid>
  )
}

export default DeliveryScreen
