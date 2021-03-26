import React from "react"
import { useDispatch } from "react-redux"
import  { Redirect } from 'react-router-dom'
import { logout } from "../../store/Actions/userActions"

const Logout = ({browserHistory}) => {
    const dispatch = useDispatch()
        dispatch(logout())
        return <Redirect to='/auth/signin'  />
}

export default Logout