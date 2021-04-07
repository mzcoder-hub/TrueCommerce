import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import DeleteIcon from '@material-ui/icons/Delete'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const productSku = match.params.sku

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  // console.log(cartItems)

  const dataVariant = []
  cartItems.map((cartData) =>
    cartData.variant.forEach((element) => {
      dataVariant.push(element)
    })
  )

  const stokVariant = []
  cartItems.map((cartData) =>
    cartData.variant.forEach((element) => {
      stokVariant.push(element.stok)
    })
  )

  const getSku = []
  cartItems.map((skuData) =>
    skuData.variant.forEach((element) => {
      getSku.push(element.sku)
    })
  )

  const style = {
    background: 'rgb(2 2 2)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    margin: '10px',
  }
  function makeid(length) {
    var result = ''
    var characters = '12345678900987654321'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, productSku))
    }
  }, [dispatch, productId, qty, productSku])

  const removeFromCartHandler = () => {
    console.log('remove cart')
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }))
  const classes = useStyles()
  return (
    <Grid item xs={12} key={makeid(10)}>
      <Link to='/'>
        <Button style={style}>Back</Button>
      </Link>
      {cartItems.length === 0 ? (
        <Message childern='Your Cart is Empty' />
      ) : (
        <>
          <Card style={{ marginBottom: 65 }}>
            <CardContent>
              <Grid container spacing={2} key={makeid(10)}>
                <Grid item xs={12} key={makeid(10)}>
                  <Typography
                    variant='h5'
                    component='h1'
                    style={{ marginBottom: 10 }}
                  >
                    Keranjang Belanja :
                  </Typography>
                  <Divider />
                  <div style={{ marginTop: 10 }}>
                    {cartItems.map((item, key) => (
                      <Grid
                        container
                        spacing={1}
                        key={item.product}
                        style={{ height: 100 }}
                      >
                        <Grid item xs={2} sm={2} key={makeid(10)}>
                          <center>
                            <Avatar
                              alt='Remy Sharp'
                              src={item.primaryImage}
                              className={classes.large}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </center>
                        </Grid>
                        <Grid item xs={6} sm={6} key={makeid(10)}>
                          <Typography>{item.name}</Typography>
                          <div style={{ fontSize: 13 }}>
                            {dataVariant[key].ukuran}, {dataVariant[key].warna}
                          </div>
                        </Grid>
                        <Grid item xs={2} sm={2} key={makeid(10)}>
                          <FormControl style={{ width: '100%' }}>
                            <InputLabel id='demo-simple-select-label'>
                              Qty
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value),
                                    getSku[key]
                                  )
                                )
                              }
                            >
                              {[
                                ...Array(parseInt(stokVariant[key])).keys(),
                              ].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          sm={2}
                          key={makeid(10)}
                          style={{ textAlign: 'center', marginTop: 20 }}
                        >
                          <DeleteIcon
                            style={{ marginLeft: 5 }}
                            onClick={() => removeFromCartHandler(item.product)}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </div>
                  <Button
                    variant='outlined'
                    color='secondary'
                    style={{ width: '100%' }}
                  >
                    Periksa
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Grid>
  )
}

export default CartScreen
