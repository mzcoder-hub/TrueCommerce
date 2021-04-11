import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
// import Divider from '@material-ui/core/Divider'
// icon component
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ReceiptIcon from '@material-ui/icons/Receipt'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox'
import SettingsIcon from '@material-ui/icons/Settings'
import ImageIcon from '@material-ui/icons/Image'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// component
import { logout } from '../actions/userActions'

const ProfileScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  // console.log(userInfo)

  // function dateFormat(date) {
  //   const month = date.getMonth()
  //   const day = date.getDate()
  //   const monthString = month >= 10 ? month : `0${month}`
  //   const dayString = day >= 10 ? day : `0${day}`
  //   return `${date.getFullYear()}-${monthString}-${dayString}`
  // }

  // console.log(dateFormat(new Date()))

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  const ListItemLink = (props) => {
    return <ListItem button component='a' {...props} />
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Grid item xs={12} style={{ marginTop: 10 }}>
      <Card style={{ marginBottom: 65 }}>
        <CardContent>
          <List component='nav' aria-label='main mailbox folders'>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={userInfo && userInfo.name}
                secondary='Joined at Jan 9, 2014'
              />
            </ListItem>
            <Link
              to='/profile/edit'
              style={{ textDecoration: 'none', color: '#000' }}
            >
              <ListItem button>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary='Akun' />
              </ListItem>
            </Link>
            <Link
              to='/profile/edit'
              style={{ textDecoration: 'none', color: '#000' }}
            >
              <ListItem button>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary='Belum Dibayar' />
              </ListItem>
            </Link>
            <ListItem button>
              <ListItemIcon>
                <MoveToInboxIcon />
              </ListItemIcon>
              <ListItemText primary='Dikemas' />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary='Dikirim' />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary='Setting' />
            </ListItem>
            <ListItem button onClick={logoutHandler}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ProfileScreen
