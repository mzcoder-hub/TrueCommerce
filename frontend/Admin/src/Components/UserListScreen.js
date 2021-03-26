import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Compo/Message'
import Loader from './Compo/Loader'
import { listUsers, deleteUser } from '../store/Actions/userActions'
import Aux from "../hoc/_Aux"

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
       <Aux>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='feather icon-check-circle' style={{ color: 'green', listStyleType: "none" }}></i>
                  ) : (
                    <i className='feather icon-x-circle' style={{ color: 'red', listStyleType: "none" }}></i>
                  )}
                </td>
                {user.isAdmin === true && user.name !== userInfo.name ? (
                  <td>
                    <LinkContainer to={`/pengguna/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <li className='feather icon-edit-1' style={{ listStyleType: "none" }}></li>
                      </Button>
                    </LinkContainer>
                  </td>
                ) : (
                  <td>
                    <LinkContainer to={`/pengguna/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <li className='feather icon-edit-1' style={{ listStyleType: "none" }}></li>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <li className='feather icon-delete' style={{listStyleType: "none" }}></li>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </Aux>
    </>
  )
}

export default UserListScreen
