import React from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import tShirts from './Icons/cloth.svg'
import trousers from './Icons/trousers.svg'
import shorts from './Icons/shorts.svg'
import sandals from './Icons/sandals.svg'

const Category = () => {
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
  return (
    <div className={classes.root}>
      <Card className={classes.root}>
        <CardActionArea
          className='productBody'
          component='span'
          style={{ cursor: 'default' }}
        >
          <CardContent style={{ marginTop: -30, textAlign: 'center' }}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <BootstrapTooltip title='Kaos'>
                  <Link to='/kategori'>
                    <IconButton>
                      <img
                        src={tShirts}
                        style={{ width: 80, height: 80 }}
                        alt='Cloth'
                      />
                    </IconButton>
                  </Link>
                </BootstrapTooltip>
                <Typography
                  gutterBottom
                  component='h6'
                  style={{ textAlign: 'center' }}
                >
                  Kaos
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <BootstrapTooltip title=' Celana Panjang'>
                  <Link to='/kategori'>
                    <IconButton>
                      <img
                        src={trousers}
                        style={{ width: 80, height: 80 }}
                        alt='Cloth'
                      />
                    </IconButton>
                  </Link>
                </BootstrapTooltip>
                <Typography
                  gutterBottom
                  component='h6'
                  style={{ textAlign: 'center' }}
                >
                  Celana Panjang
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <BootstrapTooltip title=' Celana Pendek'>
                  <Link to='/kategori'>
                    <IconButton>
                      <img
                        src={shorts}
                        style={{ width: 80, height: 80 }}
                        alt='Cloth'
                      />
                    </IconButton>
                  </Link>
                </BootstrapTooltip>
                <Typography
                  gutterBottom
                  component='h6'
                  style={{ textAlign: 'center' }}
                >
                  Celana Pendek
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <BootstrapTooltip title='Sandals'>
                  <Link to='/kategori'>
                    <IconButton>
                      <img
                        src={sandals}
                        style={{ width: 80, height: 80 }}
                        alt='Cloth'
                      />
                    </IconButton>
                  </Link>
                </BootstrapTooltip>
                <Typography
                  gutterBottom
                  component='h6'
                  style={{ textAlign: 'center' }}
                >
                  Sandals
                </Typography>
              </Grid>

              {/* <Grid item xs={3}>
                Sepatu
              </Grid>
              <Grid item xs={3}>
                Category
              </Grid>
              <Grid item xs={3}>
                Category
              </Grid>
              <Grid item xs={3}>
                Category
              </Grid> */}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Category
