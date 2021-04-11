import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import Button from '../components/Button'
import CustomInput from '../components/CustomInput'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setshowPassword] = useState(false)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

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

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not Match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <Grid item xs={12}>
      <Card style={{ marginBottom: 65 }}>
        <CardContent>
          <div style={{ textAlign: 'center' }}>
            <Typography style={{ fontSize: '1.25rem' }} component='h1'>
              Sign Up
            </Typography>
            <img
              src='/images/logo.png'
              alt={process.env.REACT_APP_SITENAME}
              style={{ width: 80, height: 80 }}
            />
          </div>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              {message && (
                <Message
                  severity='error'
                  childern={message}
                  style={{ textAlign: 'left' }}
                />
              )}
              {error && (
                <Message
                  severity='error'
                  childern={error}
                  style={{ textAlign: 'left' }}
                />
              )}
              {loading && <Loader />}
              <form
                className='form'
                style={{ margin: '0px 80px 30px', textAlign: 'center' }}
                onSubmit={submitHandler}
              >
                <CustomInput
                  labelText='Name'
                  id='name'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  handleChange={handleChangeName}
                  type='text'
                />
                <CustomInput
                  labelText='Email'
                  id='email'
                  formControlProps={{
                    fullWidth: true,
                  }}
                  handleChange={handleChangeEmail}
                  type='text'
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
                <Button
                  color='github'
                  className='form__custom-button'
                  size='sm'
                >
                  <span onClick={showPasswordHandler}>Lihat Password</span>
                </Button>
                <br />

                <Button
                  type='submit'
                  color='github'
                  className='form__custom-button'
                >
                  Register
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              Sudah punya akun?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Login
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default RegisterScreen
