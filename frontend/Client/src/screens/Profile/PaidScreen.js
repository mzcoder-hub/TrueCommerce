import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import Divider from '@material-ui/core/Divider'

import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core'

import Loader from '../../components/Loader'
import { listOrdersPaid, sendCancelRequest } from '../../actions/orderActions'

const PaidScreen = ({ history }) => {
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

  const orderPaid = useSelector((state) => state.orderPaid)
  const { loading, list } = orderPaid

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listOrdersPaid(userInfo._id))
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

  const returnHandler = () => {
    history.goBack()
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
      sendCancelRequest({
        id: orderId,
        reason,
      })
    )
    setOpen(false)
    setReason('')
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
          {'Ingin Dibatalkan ?'}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
            component='span'
          >
            <TextField
              id='outlined-multiline-static'
              label='Berikan Komentar Kalian'
              multiline
              rows={4}
              variant='outlined'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitHandler} color='primary' autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Grid item xs={12} key='utama' style={{ marginBottom: 65 }}>
        <Button style={style} onClick={returnHandler}>
          Back
        </Button>

        <Typography variant='h5' component='h1' style={{ marginBottom: 10 }}>
          Pesanan Menunggu Dikirim :
        </Typography>
        {loading ? (
          <Loader />
        ) : list ? (
          list.map((val, key) => (
            <Card style={{ marginTop: 5 }} key={key}>
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
                subheader={`Terbayarkan Pada : ${dayjs(
                  val.paymentResult.update_time
                ).format('D MMMM, YYYY')}`}
                subheaderTypographyProps={{ style: { fontSize: 15 } }}
                action={
                  <div style={{ padding: 30 }}>{val.paymentResult.status}</div>
                }
              />
              <CardContent>
                {val.orderItems.map((item) => (
                  <Grid container spacing={2} key={item.slug}>
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
                ))}
                <Grid container spacing={2} key='bottomCard'>
                  <Grid item xs={5} key={`OrderRating$key`}></Grid>
                  <Grid item xs={3} key={`ButtonReorder$key`}>
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
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={4} key={`ButtonReorder$key2`}>
                    <a
                      href={`https://api.whatsapp.com/send?phone=+6282226848282&text=Tanya%20Status%20Barang%20Kode%20Barang%20:%20${val.orderId}`}
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
                        Hubungi Admin
                      </Button>
                    </a>
                  </Grid>
                </Grid>
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

export default PaidScreen
