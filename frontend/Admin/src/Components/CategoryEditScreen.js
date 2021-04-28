import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import Message from './Compo/Message'
import Loader from './Compo/Loader'
import FormContainer from './Compo/FormContainer'
import {
  categoryDetails,
  updateCategory,
} from '../store/Actions/categoryActions'
import { CATEGORY_DETAIL_RESET, CATEGORY_UPDATE_RESET } from '../store/constant'

import KemejaPria from '../assets/images/KemejaPria.png'
import BajuPria from '../assets/images/BajuPria.png'
import BajuWanita from '../assets/images/BajuWanita.png'
import MuslimWanita from '../assets/images/MuslimWanita.png'

const CategoryEditScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const categoryDetail = useSelector((state) => state.categoryDetail)
  const { loading, category, error } = categoryDetail

  const [name, setName] = useState('')
  const [newSlug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')

  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const { success: successUpdate } = categoryUpdate

  const categorySlug = match.params.slug

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      history.push('/auth/signin')
    }

    if (successUpdate) {
      dispatch({ type: CATEGORY_DETAIL_RESET })
      dispatch({ type: CATEGORY_UPDATE_RESET })
      history.push('/kategori')
    } else {
      if (!category.name || category.slug !== categorySlug) {
        dispatch(categoryDetails(categorySlug))
      } else {
        setName(category.name)
        setSlug(category.slug)
        setDescription(category.description)
        setIcon(category.icon)
      }
    }
  }, [dispatch, history, userInfo, successUpdate, category, categorySlug])

  const submitHandler = (e) => {
    e.preventDefault()

    const oldSlug = category.slug

    const dataCategory = {
      name,
      newSlug,
      oldSlug,
      description,
      icon,
    }
    dispatch(updateCategory(dataCategory))
  }

  return (
    <>
      <Link to='/kategori' className='btn btn-light my-3'>
        Go back
      </Link>
      <Card>
        <Card.Body>
          <FormContainer>
            <h1>Edit Kategori</h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Category Your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='slug'>
                  <Form.Label>Slug / URL</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Url (lowwerCase)'
                    value={newSlug}
                    onChange={(e) => setSlug(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Category Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='icon'>
                  <Form.Label>Icon</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Icon'
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='icon'>
                  <Form.Label>Isi Icon dengan Code Dibawah ini</Form.Label>
                  <div>
                    <Row>
                      <Col xs={3} style={{ textAlign: 'center' }}>
                        <img
                          src={KemejaPria}
                          alt='KemejaPria'
                          style={{ width: '100%' }}
                        />
                        KemejaPria{' '}
                      </Col>
                      <Col xs={3} style={{ textAlign: 'center' }}>
                        <img
                          src={BajuPria}
                          alt='BajuPria'
                          style={{ width: '100%' }}
                        />
                        BajuPria{' '}
                      </Col>
                      <Col xs={3} style={{ textAlign: 'center' }}>
                        <img
                          src={BajuWanita}
                          alt='BajuWanita'
                          style={{ width: '100%' }}
                        />
                        BajuWanita{' '}
                      </Col>
                      <Col xs={3} style={{ textAlign: 'center' }}>
                        <img
                          src={MuslimWanita}
                          alt='MuslimWanita'
                          style={{ width: '100%' }}
                        />
                        MuslimWanita{' '}
                      </Col>
                    </Row>
                  </div>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Form>
            )}
          </FormContainer>
        </Card.Body>
      </Card>
    </>
  )
}

export default CategoryEditScreen
