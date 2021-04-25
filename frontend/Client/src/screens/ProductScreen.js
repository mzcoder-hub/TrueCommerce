import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Carousel from 'react-material-ui-carousel'
import Divider from '@material-ui/core/Divider'

import Meta from '../components/Meta'
import Rated from '../components/Rated'
import AddToCartCheckout from '../components/AddToCartCheckout'

import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const imagessss = product && product.image ? product.image : []
  // const res = imagessss.map((position) => ({ position }))

  const res = imagessss.map((data) => {
    const str = data.replace(/[^a-z0-9-.A-Z]/g, '/')

    return { position: str }
  })

  useEffect(() => {
    dispatch(listProductDetails(match.params.slug))
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

  return (
    <>
      <Meta
        title={product.name}
        description='Product Description'
        keyword='Product Keywords'
        contentUrl={`http://localhost:3000/${product.slug}`}
        contentType=''
        contentDescription=''
        contentPrimaryImage={product.primaryImage}
      />

      <Grid item xs={12}>
        <Button style={style} onClick={returnHandler}>
          Back
        </Button>
        <Carousel>
          {res.map(({ position }) => (
            <Card key={position}>
              <CardMedia
                image={`/${position}`}
                style={{
                  height: 282,
                  paddingTop: '25%',
                }}
              />
            </Card>
          ))}
        </Carousel>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message severity='error' childern={error} />
        ) : (
          <>
            <Card style={{ marginBottom: 65 }}>
              <CardContent>
                <Typography variant='h4' component='h1'>
                  {product.name}
                </Typography>
                <Rated
                  value={product.rating}
                  text={`${product.numReviews} Rating`}
                  classname='countReviewPost'
                />
                <Divider />
                <Typography
                  variant='h5'
                  component='h2'
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  Spesifikasi Produk {product.name}
                </Typography>
                <TableContainer style={{ margin: 5 }}>
                  <Table aria-label='simple table'>
                    <TableBody>
                      <TableRow>
                        <TableCell component='th' scope='row'>
                          <strong>Kategori</strong>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component='th' scope='row'>
                          <strong>Brand</strong>
                        </TableCell>
                        <TableCell>{product.brand}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component='th' scope='row'>
                          <strong>Jumlah Stok</strong>
                        </TableCell>
                        <TableCell>{product.countInStock}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography
                  variant='h5'
                  component='h3'
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  Deskripsi Produk {product.name}
                </Typography>
                <div
                  className='deskripsi'
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </CardContent>
            </Card>
          </>
        )}
        <AddToCartCheckout
          product={
            product && product.variant && product.variant.length > 0
              ? product.variant
              : []
          }
          productId={product && product._id ? product._id : ''}
        />
      </Grid>
    </>
  )
}

export default ProductScreen
