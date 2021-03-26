import React from 'react'
import { Grid } from '@material-ui/core'
import Products from '../components/Products'
import Sliders from '../components/Sliders'
import Category from '../components/Category'

const HomeScreens = () => {
  return (
    <>
      <Grid m={2}>
        <Sliders />
      </Grid>
      <Category />
      <Grid style={{ marginBottom: 65 }}>
        <Products />
      </Grid>
    </>
  )
}

export default HomeScreens
