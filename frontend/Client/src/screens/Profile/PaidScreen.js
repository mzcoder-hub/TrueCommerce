import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import { Divider } from '@material-ui/core'

import Loader from '../../components/Loader'
import { listOrdersPaid } from '../../actions/orderActions'

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
  return (
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
              title={`${val.orderId}`}
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
                <Grid item xs={5} key={`OrderRating$key`}>
                  rating
                </Grid>
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
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={4} key={`ButtonReorder$key2`}>
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <></>
      )}
    </Grid>
  )
}

export default PaidScreen
