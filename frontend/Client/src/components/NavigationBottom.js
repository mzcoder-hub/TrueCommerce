import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className='stickToBottomHome'
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
        to='/produk'
        label='Cart'
        value='Cart'
        icon={<ShoppingCartOutlinedIcon />}
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
