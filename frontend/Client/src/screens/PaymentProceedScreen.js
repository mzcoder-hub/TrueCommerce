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
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'
import { Box, Button, TextField } from '@material-ui/core'

import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'

const PaymentProceedScreen = ({ match }) => {
  function rupiahConvert(nominal) {
    if (nominal) {
      var rupiah = ''
      var numberrev = nominal.toString().split('').reverse().join('')
      for (var i = 0; i < numberrev.length; i++)
        if (i % 3 === 0) rupiah += numberrev.substr(i, 3) + '.'
      return (
        'Rp. ' +
        rupiah
          .split('', rupiah.length - 1)
          .reverse()
          .join('')
      )
    } else {
      return nominal
    }
  }

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading } = orderDetails
  const [expanded, setExpanded] = useState('')
  const [toasOpen, setToasOpen] = useState(false)

  const ToastClose = () => {
    setToasOpen(false)
  }

  const inputProps = {
    style: {
      textAlign: 'center',
      margin: 0,
      color: '#000',
      fontWeight: 'bold',
    },
  }

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id))
  }, [dispatch, match])

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
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

  return (
    <Grid item xs={12} style={{ marginTop: 10, marginBottom: 65 }}>
      <Card>
        {loading ? (
          <Loader />
        ) : order ? (
          <CardContent>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                key='logo-bank'
                style={{ textAlign: 'center' }}
              >
                <img
                  src={
                    order.paymentMethod === 'BCAVA'
                      ? '/images/BCA.svg'
                      : '/images/BRI.svg'
                  }
                  alt={order.paymentMethod === 'BCA' ? 'BANK BCA' : 'BANK BNI'}
                  style={{ width: 150, height: 'auto' }}
                />
              </Grid>
              <Grid item xs={12} key='status' style={{ textAlign: 'center' }}>
                <Box display='flex' justifyContent='center'>
                  <Box
                    p={1}
                    bgcolor={
                      order.paymentResult.status === 'UNPAID'
                        ? 'rgb(255 74 74 / 78%)'
                        : order.paymentResult.status === 'PAID'
                        ? 'rgb(34 255 10 / 70%)'
                        : order.paymentResult.status === 'REFUND'
                        ? 'rgb(255 74 74 / 81%)'
                        : ''
                    }
                    style={{ fontWeight: 'bold' }}
                  >
                    {order.paymentResult.status}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} key='nominal' style={{ textAlign: 'center' }}>
                <Box display='flex' justifyContent='center'>
                  <Box p={1} style={{ fontWeight: 'bold' }}>
                    Nominal : <br />
                    {rupiahConvert(order.totalPrice)}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} key='Code-VA' style={{ textAlign: 'center' }}>
                <TextField
                  id='standard-basic'
                  value={order.paymentResult.paycode}
                  inputProps={inputProps}
                  disabled
                />
              </Grid>
              <Grid item xs={12} key='copy' style={{ textAlign: 'center' }}>
                <CopyToClipboard
                  text={order.paymentResult.paycode}
                  onCopy={() => {
                    setToasOpen(true)
                  }}
                >
                  <Button variant='contained' color='default'>
                    Copy To Clipboard
                  </Button>
                </CopyToClipboard>
                <Snackbar
                  open={toasOpen}
                  autoHideDuration={3000}
                  onClose={ToastClose}
                >
                  <Alert onClose={ToastClose} severity='success'>
                    Sudah dicopy !!
                  </Alert>
                </Snackbar>
              </Grid>
              <Grid item xs={12} key='instruction'>
                {order.instructions &&
                  order.instructions.map((instruction, key) => (
                    <Accordion
                      square
                      expanded={expanded === `panel${key}`}
                      onChange={handleChange(`panel${key}`)}
                      key={instruction._id}
                    >
                      <AccordionSummary
                        aria-controls={`panel${key}d-content`}
                        id={`panel${key}d-header`}
                        key={`panel-${key}`}
                      >
                        <Typography key={instruction.title}>
                          {instruction.title}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails key={instruction._id}>
                        <Grid container>
                          <ol style={{ lineHeight: 2 }} key={`langkah-${key}`}>
                            {instruction.steps.map((step, key) => (
                              <li
                                dangerouslySetInnerHTML={{ __html: step }}
                                key={`langkah2-${key}`}
                              ></li>
                            ))}
                          </ol>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </Grid>
            </Grid>
          </CardContent>
        ) : (
          <></>
        )}
      </Card>
    </Grid>
  )
}

export default PaymentProceedScreen
