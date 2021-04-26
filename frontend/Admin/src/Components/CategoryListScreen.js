import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from './Compo/Loader'
import Message from './Compo/Message'
import {
  createCategory,
  deleteCategory,
  listCategory,
} from '../store/Actions/categoryActions'
import { CATEGORY_CREATE_RESET, CATEGORY_LIST_RESET } from '../store/constant'

const CategoryListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, category, error } = categoryList

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { success, create, error: errorCreate } = categoryCreate

  const categoryDelete = useSelector((state) => state.categoryDelete)
  const { success: deleteSuccess } = categoryDelete

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/auth/signin')
    }
    dispatch(listCategory())
    if (success) {
      dispatch({ type: CATEGORY_CREATE_RESET })
      history.push(`/kategori/${create.slug}/edit`)
    }
  }, [history, dispatch, userInfo, success, create, deleteSuccess])

  const createCategoryHandler = () => {
    dispatch(createCategory())
  }

  const categoryDeleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCategory(id))
    }
  }
  return (
    <>
      <Row>
        <Col md={12} className='my-5'>
          <Card>
            <Card.Body>
              <h1 style={{ fontSize: 20 }}>Daftar Kategori</h1>
              <Col className='text-right'>
                <Button className='my-3' onClick={createCategoryHandler}>
                  <i className='feather icon-edit-1'></i> Create Product
                </Button>
              </Col>
              {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th width='350'>Nama</th>
                      <th width='340'>slug</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((item) => (
                      <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td>
                          {item.slug === 'uncategorize' ? (
                            <>
                              <strong>Default Category</strong>
                            </>
                          ) : (
                            <>
                              <LinkContainer to={`/kategori/${item.slug}/edit`}>
                                <Button
                                  className='label theme-bg text-white f-12'
                                  title='Edit'
                                >
                                  {' '}
                                  Edit
                                  <li
                                    className='feather icon-edit-1'
                                    style={{ listStyleType: 'none' }}
                                  ></li>
                                </Button>
                              </LinkContainer>
                              <Button
                                title='Delete'
                                className='label theme-bg2 text-white f-12'
                                onClick={() => categoryDeleteHandler(item._id)}
                              >
                                {' '}
                                Delete
                                <li
                                  className='feather icon-delete'
                                  style={{ listStyleType: 'none' }}
                                ></li>
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CategoryListScreen
