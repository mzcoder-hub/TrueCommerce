import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Divider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import dayjs from 'dayjs'

import {
  listOrdersDelivered,
  sendRecievedRequest,
} from '../../actions/orderActions'
import Loader from '../../components/Loader'

const DeliveredScreen = ({ history }) => {
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

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDelivered = useSelector((state) => state.orderDelivered)
  const { loading, list } = orderDelivered

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listOrdersDelivered(userInfo._id))
    }
  }, [history, userInfo, dispatch])

  const style = {
    background: 'rgb(2 2 2)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    margin: '10px',
    textDecoration: 'none',
  }

  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [orderId, setOrderId] = useState('')

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant='h6'>{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label='close'
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    )
  })

  const handleClickOpen = (e) => {
    setOrderId(e)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const submitHandler = () => {
    dispatch(
      sendRecievedRequest({
        id: orderId,
      })
    )
    setOpen(false)
    setReason('')
  }
  const returnHandler = () => {
    history.goBack()
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Apakah Sudah Di Terima ?'}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id='alert-dialog-description' component='span'>
            <p align='justify'>
              Periksa Baik-Baik paket yang diterima bila terjadi kerusakan tapi
              sudah mengubah status menjadi diterima, maka barang tidak dapat
              dikembalikan !!!
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler} color='primary' autoFocus>
            Terima
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={12} key='utama' style={{ marginBottom: 65 }}>
        <Button style={style} onClick={returnHandler}>
          Back
        </Button>

        <Typography variant='h5' component='h1' style={{ marginBottom: 10 }}>
          Pesanan Dikirim :
        </Typography>
        {loading ? (
          <Loader />
        ) : list ? (
          list.map((val, key) => (
            <Card style={{ marginTop: 5 }} key={val._id}>
              <CardHeader
                title={
                  <a
                    href={`/pembayaran/${val._id}`}
                    style={{ textDecoration: 'none', color: '#000' }}
                  >
                    {val.orderId}
                  </a>
                }
                titleTypographyProps={{
                  component: 'h6',
                  style: { fontSize: 20 },
                }}
                subheader={`Order Pada : ${dayjs(val.createdAt).format(
                  'D MMMM, YYYY'
                )}`}
                subheaderTypographyProps={{ style: { fontSize: 15 } }}
                action={
                  <div style={{ padding: 30 }}>{val.paymentResult.status}</div>
                }
              />
              <CardContent>
                {val.orderItems.map((item) => (
                  <>
                    <Grid container spacing={2} key={`Item${item.slug}`}>
                      <Grid item xs={2} key={`image$key`}>
                        <img
                          src={item.primaryImage}
                          style={{ width: '100%' }}
                          alt={item.name}
                        />
                      </Grid>
                      <Grid item xs={7} key={`productItem$key`}>
                        <Typography style={{ fontSize: 16 }}>
                          {item.name}
                        </Typography>
                        <div>
                          Variant : {item.variant[0].warna},{' '}
                          {item.variant[0].ukuran}
                        </div>
                        <div>x {item.qty}</div>
                      </Grid>
                      <Grid item xs={3} key={`productItemPrice$key`}>
                        <Typography style={{ fontSize: 13, padding: 30 }}>
                          {rupiahConvert(item.variant[0].harga)}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        key={`divider-${item.name}`}
                        style={{ marginTop: -15 }}
                      >
                        <Divider />
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} key={`bottomCard${item._id}`}>
                      <Grid item xs={3} key={`OrderRating${item._id}`}></Grid>
                      <Grid item xs={3} key={`ButtonCanceled${item._id}`}>
                        {val.isRecieved ? (
                          <></>
                        ) : (
                          <Button
                            style={{
                              background: 'rgb(2 2 2)',
                              borderRadius: 3,
                              border: 0,
                              color: 'white',
                              height: 30,
                              width: '100%',
                              textDecoration: 'none',
                            }}
                          >
                            Dikembalikan
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={3} key={`ButtonReview${item._id}`}>
                        <Link
                          to={`/produk/${item.slug}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button
                            style={{
                              background: 'rgb(2 2 2)',
                              borderRadius: 3,
                              border: 0,
                              color: 'white',
                              height: 30,
                              width: '100%',
                              textDecoration: 'none',
                            }}
                          >
                            Penilaian
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item xs={3} key={`ButtonRecieved${item._id}`}>
                        {val.isRecieved ? (
                          <></>
                        ) : (
                          <Button
                            style={{
                              background: 'rgb(2 2 2)',
                              borderRadius: 3,
                              border: 0,
                              color: 'white',
                              height: 30,
                              width: '100%',
                              textDecoration: 'none',
                            }}
                            onClick={() => handleClickOpen(val._id)}
                          >
                            Di Terima
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </>
                ))}
              </CardContent>
            </Card>
          ))
        ) : (
          <></>
        )}
      </Grid>
    </>
  )
}

export default DeliveredScreen
