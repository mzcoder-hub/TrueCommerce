import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import { makeStyles } from '@material-ui/core/styles'
// import IconButton from '@material-ui/core/IconButton'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

import { listProducts, listProductsByCategory } from '../actions/productActions'
import Rated from '../components/Rated'
import Loading from '../components/Loader'
import Message from '../components/Message'

const ProductByCategoryScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const productListByCategory = useSelector(
    (state) => state.productListByCategory
  )
  const { loading, error, products } = productListByCategory

  useEffect(() => {
    dispatch(listProductsByCategory(match.params.slug))
  }, [dispatch, match])

  const style = {
    background: 'rgb(2 2 2)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px',
    margin: '10px',
  }
  const returnHandler = () => {
    history.goBack()
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      float: 'left',
      color: theme.palette.text.secondary,
    },
    noWrap: {
      textOverflow: "'...'",
    },
  }))

  const classes = useStyles()

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

  return (
    <>
      <Meta
        title='Daftar Produk Kategori Murah'
        description='Daftar Produk Category Murah'
        keywords='Produk Kategori Murah, Kategori Murah, Jual Kategori Murah'
        contentUrl=''
        contentType=''
        contentDescription=''
        contentPrimaryImage=''
      />
      <Grid style={{ marginBottom: 65 }}>
        <Button style={style} onClick={returnHandler}>
          Back
        </Button>
        <Typography
          component='h1'
          style={{
            fontSize: ' 25px',
            borderBottom: '1px solid #000',
            margin: '10px',
            padding: ' 5px',
          }}
        >
          Produk Kategori
        </Typography>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message severity='error' childer={error} />
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={6} key={product._id}>
                <Card className={classes.root}>
                  <CardActionArea className='productBody' component='span'>
                    <Link
                      to={`/produk/${product.slug}`}
                      className='btn btn-light'
                    >
                      <CardMedia
                        component='img'
                        alt={product.name}
                        image={product.primaryImage}
                        title={product.name}
                        className='image-product'
                      />
                    </Link>
                    <span>
                      <p>Rp. {rupiahConvert(30000)}</p>
                    </span>
                    <span className='rated'>
                      <Rated
                        value={product.rating}
                        text={`${product.numReviews} Rating`}
                        classname='countReview'
                      />
                    </span>
                    <CardContent>
                      <Typography
                        gutterBottom
                        classes={{ noWrap: classes.noWrap }}
                        noWrap
                        style={{ fontSize: 15 }}
                        component='h1'
                      >
                        {product.name}
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        padding: 8,
                        textAlign: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {/* <Grid item xs={6}>
                      <Link
                        to={`/produk/${product.slug}`}
                        className='btn btn-light'
                      >
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton>
                        <AddShoppingCartIcon />
                      </IconButton>
                    </Grid> */}
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default ProductByCategoryScreen
