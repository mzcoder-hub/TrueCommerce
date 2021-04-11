import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CustomInput from '../components/CustomInput'
import Button from '../components/Button'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  getUserDetails,
  updateUserProfile,
  logout,
} from '../actions/userActions'
// import { listMyOrders } from '../actions/orderActions'

const ProfileEditScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showPassword, setshowPassword] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user, error } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  // const orderMyList = useSelector((state) => state.orderMyList)
  // const { loading: loadingOrders, error: errorOrders, orders } = orderMyList

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        // dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const handleChangeName = (e) => {
    setName(e.currentTarget.value)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.currentTarget.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.currentTarget.value)
  }

  const showPasswordHandler = (e) => {
    if (showPassword === true) {
      setshowPassword(false)
    } else {
      setshowPassword(true)
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))

      setTimeout(function () {
        window.location.reload()
      }, 3000)
    }
  }
  return (
    <Grid item xs={12} style={{ marginTop: 10 }}>
      <Card style={{ marginBottom: 65 }}>
        <CardContent>
          {message && <Message severity='error' childern={message} />}
          {error && <Message severity='error' childern={error} />}
          {success && <Message severity='success' childern='Profile Updated' />}
          {loading && <Loader />}
          <Typography style={{ fontSize: '1.25rem' }} component='h1'>
            Edit Akun
          </Typography>
          <form className='form' onSubmit={submitHandler}>
            <CustomInput
              labelText='Name'
              id='name'
              formControlProps={{
                fullWidth: true,
              }}
              handleChange={handleChangeName}
              type='text'
              value={name}
            />

            <CustomInput
              labelText='Email'
              id='email'
              formControlProps={{
                fullWidth: true,
              }}
              handleChange={handleChangeEmail}
              type='text'
              value={email}
            />
            <CustomInput
              labelText='Password'
              id='password'
              formControlProps={{
                fullWidth: true,
              }}
              handleChange={handleChangePassword}
              type={showPassword ? 'text' : 'password'}
            />
            <CustomInput
              labelText='Confirm Password'
              id='confirmPassword'
              formControlProps={{
                fullWidth: true,
              }}
              handleChange={handleConfirmPassword}
              type={showPassword ? 'text' : 'password'}
            />
            <Button color='github' className='form__custom-button' size='sm'>
              <span onClick={showPasswordHandler}>Lihat Password</span>
            </Button>
            <br />
            <Button
              type='submit'
              color='github'
              className='form__custom-button'
            >
              Perbarui
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default ProfileEditScreen
