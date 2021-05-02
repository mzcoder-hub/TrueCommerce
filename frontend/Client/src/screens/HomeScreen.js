import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Products from '../components/Products'
import Sliders from '../components/Sliders'
import Category from '../components/Category'
import { listCategory } from '../actions/productActions'

const HomeScreens = ({ match }) => {
  const dispatch = useDispatch()
  var keyword
  var pageNumber
  if (match.params) {
    keyword = match.params.keyword
    pageNumber = match.params.pageNumber || 1
  }

  useEffect(() => {
    dispatch(listCategory())
  }, [dispatch])
  return (
    <>
      <Grid m={2}>
        <Sliders />
      </Grid>
      <Category />
      <Grid style={{ marginBottom: 65 }}>
        <Products keyword={keyword} pageNumber={pageNumber} />
      </Grid>
    </>
  )
}

export default HomeScreens
