import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Slider from 'react-slick'

import KemejaPria from './Icons/KemejaPria.png'
import BajuPria from './Icons/BajuPria.png'
import BajuWanita from './Icons/BajuWanita.png'
import MuslimWanita from './Icons/MuslimWanita.png'
import Loader from './Loader'

const Category = () => {
  const categoryList = useSelector((state) => state.categoryList)
  const { category, page, loading, pages } = categoryList

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 2,
      marginBottom: 8,
    },
  }))

  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
  }))

  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap()

    return <Tooltip arrow classes={classes} {...props} />
  }

  const classes = useStyles()

  const settings = {
    // customPaging: function (i) {
    //   return <a>{i}</a>
    // },
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <CardActionArea
          className='productBody'
          component='span'
          style={{ cursor: 'default' }}
        >
          <CardContent className='cardContentCategory'>
            <Slider {...settings} style={{ margin: 10 }}>
              <div>
                <Grid container spacing={1}>
                  {loading ? (
                    <Loader />
                  ) : (
                    category.map((val, key) =>
                      val.slug === 'uncategorize' ? (
                        ''
                      ) : (
                        <Grid item xs={3} key={val.name}>
                          <BootstrapTooltip title={val.name}>
                            <Link to={`/kategori/${val.slug}`}>
                              <IconButton>
                                <img
                                  src={
                                    val.icon === 'KemejaPria'
                                      ? KemejaPria
                                      : val.icon === 'BajuPria'
                                      ? BajuPria
                                      : val.icon === 'BajuWanita'
                                      ? BajuWanita
                                      : MuslimWanita
                                  }
                                  className='categoryImages'
                                  alt={val.name}
                                />
                              </IconButton>
                            </Link>
                          </BootstrapTooltip>
                          <Typography
                            gutterBottom
                            component='h6'
                            className='categoryTitle'
                          >
                            {val.name}
                          </Typography>
                        </Grid>
                      )
                    )
                  )}
                </Grid>
              </div>
            </Slider>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Category
