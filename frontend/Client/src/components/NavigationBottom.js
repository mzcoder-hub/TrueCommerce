import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'

const NavigationBottom = () => {
  const [value, setValue] = useState('recents')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge)

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className='stickToBottomHome'
      style={{ zIndex: 1 }}
    >
      <BottomNavigationAction
        component={Link}
        to='/'
        label='Home'
        value='Home'
        icon={<HomeOutlinedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/cart'
        icon={
          <IconButton aria-label='cart'>
            <StyledBadge badgeContent={0} color='secondary'>
              <ShoppingCartOutlinedIcon />
            </StyledBadge>
          </IconButton>
        }
      />
      <BottomNavigationAction
        component={Link}
        to='/'
        label='Account'
        value='Account'
        icon={<AccountCircleOutlinedIcon />}
      />
    </BottomNavigation>
  )
}

export default NavigationBottom
