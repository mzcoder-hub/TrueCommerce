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
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const handleChangeEmail = (e) => {
    setEmail(e.currentTarget.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.currentTarget.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <Grid item xs={12}>
      <Card style={{ marginBottom: 65 }}>
        <CardContent>
          <div style={{ textAlign: 'center' }}>
            <Typography style={{ fontSize: '1.25rem' }} component='h1'>
              Log In
            </Typography>
            <img
              src='/images/logo.png'
              alt={process.env.REACT_APP_SITENAME}
              style={{ width: 80, height: 80 }}
            />
          </div>
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={12}>
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
                  type='password'
                />

                <Button
                  type='submit'
                  color='github'
                  className='form__custom-button'
                >
                  Log in
                </Button>
              </form>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              Pelanggan Baru? Daftar Akun Baru{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Disini
              </Link>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default LoginScreen
