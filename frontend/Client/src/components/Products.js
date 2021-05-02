import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import { makeStyles } from '@material-ui/core/styles'

import { Pagination, PaginationItem } from '@material-ui/lab'
// import IconButton from '@material-ui/core/IconButton'
// import VisibilityIcon from '@material-ui/icons/Visibility'
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

import { listProducts } from '../actions/productActions'
import Rated from './Rated'
import Loading from './Loader'
import Message from './Message'

const Products = ({ keyword = '', pageNumber }) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

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
    <div className={classes.root}>
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
          <Grid item xs={12} key='pagination'>
            <Pagination
              hideNextButton={true}
              hidePrevButton={true}
              count={pages}
              renderItem={(item) => (
                <a
                  href={`/page/${item.page}`}
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  <PaginationItem {...item} selected={true} />
                </a>
              )}
              shape='rounded'
              size='large'
            />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default Products
