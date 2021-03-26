import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import Message from '../../../Components/Compo/Message';
import Loader from '../../../Components/Compo/Loader';
import {login} from '../../../store/Actions/userActions'

const SignIn = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userInfo, error } = userLogin
  
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()

    useEffect(() => {
    let isMounted = true
      if (userInfo) {
        history.push('dashboard')
      }
      return () => {isMounted = false}
    }, [history, userInfo, redirect])
  
    const submitHandler = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
    }
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                {error && <Message variant='danger'>{error}</Message>}
                                {loading && <Loader />}
                                <form onSubmit={submitHandler}>
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type='email' className='form-control' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type='password' className='form-control' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
}

export default SignIn