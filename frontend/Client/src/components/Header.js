import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Meta from './Meta'

const Header = () => {
  const history = useHistory()
  let [path, setPath] = useState('')

  useEffect(() => {
    return history.listen((location) => {
      const locationRoute = location.pathname

      const exactRouter = locationRoute.split('/')
      setPath(exactRouter)
    })
  }, [history])

  const width_setting = '100%'
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'left',
      marginBottom: 5,
      width: width_setting,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }))

  const classes = useStyles()

  return (
    <>
      <Meta />
      <Box>
        <Grid container display='flex' alignItems='center' spacing={1}>
          <Grid item xs={6}>
            <img
              src='/images/logo.png'
              alt={process.env.REACT_APP_SITENAME}
              style={{ width: 80, height: 80 }}
            />
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'center' }}>
            {path[1] === 'produk' ? (
              <h2 style={{ fontSize: 20 }}>{process.env.REACT_APP_SLOGAN}</h2>
            ) : (
              <h1 style={{ fontSize: 20 }}>{process.env.REACT_APP_SLOGAN}</h1>
            )}
          </Grid>
        </Grid>
      </Box>
      <Paper component='form' className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='Cari Produk disini'
          inputProps={{ 'aria-label': 'Cari Produk disini' }}
        />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton className={classes.iconButton} aria-label='directions'>
          <FavoriteBorderOutlinedIcon />
        </IconButton>
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton className={classes.iconButton} aria-label='directions'>
          <EmailOutlinedIcon />
        </IconButton>
        <Divider className={classes.divider} orientation='vertical' />
        <IconButton className={classes.iconButton} aria-label='directions'>
          <NotificationsNoneOutlinedIcon />
        </IconButton>
      </Paper>
    </>
  )
}

export default Header
