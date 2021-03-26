import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import Products from '../components/Products'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'

const ProductByCategoryScreen = () => {
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
        title='Daftar Produk Kategori Murah'
        description='Daftar Produk Category Murah'
        keywords='Produk Kategori Murah, Kategori Murah, Jual Kategori Murah'
      />
      <Grid style={{ marginBottom: 65 }}>
        <Link to='/'>
          <Button style={style}>Back</Button>
        </Link>
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
        <Products />
      </Grid>
    </>
  )
}

export default ProductByCategoryScreen
