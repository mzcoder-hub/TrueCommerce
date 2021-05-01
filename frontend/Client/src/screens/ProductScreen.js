import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
import Paper from '@material-ui/core/Paper'

import Meta from '../components/Meta'
import Rated from '../components/Rated'
import AddToCartCheckout from '../components/AddToCartCheckout'
import {
  categoryDetailsId,
  createProductReview,
  listProductDetails,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'

const ProductScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const categoryDetailId = useSelector((state) => state.categoryDetailId)
  const { category } = categoryDetailId

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate

  const imagessss = product && product.image ? product.image : []
  // const res = imagessss.map((position) => ({ position }))

  const res = imagessss.map((data) => {
    const str = data.replace(/[^a-z0-9-.A-Z]/g, '/')

    return { position: str }
  })

  useEffect(() => {
    if (successCreateReview) {
      alert('Review Submited')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.slug))
    if (product.category) {
      dispatch(categoryDetailsId(product.category))
    }
  }, [successCreateReview, dispatch, match])

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

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.slug, { rating, comment }))
  }

  return (
    <>
      <Meta
        title={product.name}
        description={`Jual ${product.name} murah, beli ${product.name} dengan harga murah dan berkualitas`}
        keyword={`${product.name}`}
        contentUrl={`http://localhost:3000/${product.slug}`}
        contentDescription={`Jual ${product.name} murah, beli ${product.name} dengan harga murah dan berkualitas`}
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
                  text={`${product.numReviews} Bintang`}
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
                        <TableCell>
                          <Link
                            to={`/kategori/${category.slug}`}
                            style={{ textDecoration: 'none', color: '#000' }}
                          >
                            {category.name}
                          </Link>
                        </TableCell>
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
                  variant='h6'
                  component='h3'
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  Deskripsi Produk {product.name}
                </Typography>
                <div
                  className='deskripsi'
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
                <Divider variant='fullWidth' style={{ margin: '30px 0' }} />
                <Typography
                  variant='h6'
                  component='h4'
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  Rating Produk {product.name}
                </Typography>
                <div className='comment' id='comment'>
                  <Paper style={{ padding: '40px 20px' }}>
                    {errorCreateReview && (
                      <Message severity='error' childern='errorCreateReview' />
                    )}
                    {product.reviews.length === 0 && (
                      <Message childern='No Reviews' />
                    )}
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <>
                          <Grid
                            container
                            wrap='nowrap'
                            spacing={2}
                            key={review._id}
                          >
                            <Grid item xs={12} key={review.name}>
                              <h4 style={{ margin: 0, textAlign: 'left' }}>
                                {review.name}
                              </h4>
                              <p style={{ textAlign: 'left' }}>
                                {review.comment}
                              </p>
                              <Rated
                                value={review.rating}
                                text={`${review.rating} Rating`}
                                classname='countReviewPost'
                              />
                            </Grid>
                          </Grid>
                          <Divider
                            variant='fullWidth'
                            style={{ marginTop: '-40px', marginBottom: 5 }}
                            key={review._id + product.numReviews}
                          />
                        </>
                      ))}
                    <Grid container spacing={2} key='rating-form'>
                      <Grid item xs={12} style={{ marginTop: 25 }}>
                        {userInfo ? (
                          <>
                            <FormControl style={{ width: '100%' }}>
                              <InputLabel id='demo-simple-select-label'>
                                Beri Nilai
                              </InputLabel>
                              <Select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <MenuItem value='0'>Pilih</MenuItem>
                                <MenuItem value='1'>1 - Buruk</MenuItem>
                                <MenuItem value='2'>2 - Sedang</MenuItem>
                                <MenuItem value='3'>3 - Bagus</MenuItem>
                                <MenuItem value='4'>4 - Sangat Bagus</MenuItem>
                                <MenuItem value='5'>
                                  5 - Bagus Sangat Bagus
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl
                              style={{ width: '100%', marginTop: 15 }}
                            >
                              <TextField
                                id='outlined-multiline-static'
                                label='Berikan Komentar Kalian'
                                multiline
                                rows={4}
                                variant='outlined'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              />
                            </FormControl>
                            <Button
                              variant='contained'
                              style={{ marginTop: 15 }}
                              onClick={submitHandler}
                            >
                              Kirim Komentar
                            </Button>
                          </>
                        ) : (
                          <FormControl>
                            <Message
                              childern={`Please Login to write a review`}
                            />
                            <br />
                            <br />
                            <Link
                              to='/login'
                              style={{
                                marginTop: 10,
                                textDecoration: ' none',
                                color: '#000',
                              }}
                            >
                              <Button variant='contained'>Sign In</Button>
                            </Link>
                          </FormControl>
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
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
