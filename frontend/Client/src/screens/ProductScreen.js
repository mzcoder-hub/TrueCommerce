import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import Divider from '@material-ui/core/Divider'

import Meta from '../components/Meta'
import Rated from '../components/Rated'

import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const imagessss = product.image
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

  return (
    <>
      <Meta
        title='Product Title'
        description='Product Description'
        keyword='Product Keywords'
        contentUrl=''
        contentType=''
        contentDescription=''
        contentPrimaryImage=''
      />

      <Grid item xs={12}>
        <Link to='/'>
          <Button style={style}>Back</Button>
        </Link>
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
                <Typography variant='h5' component='h1'>
                  {product.name}
                </Typography>
                <Rated
                  value={product.rating}
                  text={`${product.numReviews} Rating`}
                  classname='countReviewPost'
                />
                <Divider variant='middle' />
              </CardContent>
            </Card>
          </>
        )}
      </Grid>
    </>
  )
}

export default ProductScreen
