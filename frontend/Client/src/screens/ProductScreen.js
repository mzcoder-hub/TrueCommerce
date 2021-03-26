import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import products from '../products'
import Divider from '@material-ui/core/Divider'

import Meta from '../components/Meta'
import Rated from '../components/Rated'

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id)
  // const pictures = [
  //   { image: '/images/airpods.jpg', title: 'Iu 1' },
  //   { image: '/images/phone.jpg', title: 'Iu 2' },
  //   { image: '/images/camera.jpg', title: 'Iu 3' },
  // ]

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
      />

      <Grid item xs={12}>
        <Link to='/'>
          <Button style={style}>Back</Button>
        </Link>
        <Carousel>
          {pictures.map(({ image, title }) => (
            <Card key={image}>
              <CardMedia
                image={image}
                title={title}
                style={{
                  height: 250,
                  paddingTop: '25%',
                }}
              />
            </Card>
          ))}
        </Carousel>
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
      </Grid>
    </>
  )
}

export default ProductScreen
