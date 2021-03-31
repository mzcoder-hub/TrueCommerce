import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap'
import slugify from 'react-slugify'
import { useDispatch, useSelector } from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Message from './Compo/Message'
import Loader from './Compo/Loader'
import FormContainer from './Compo/FormContainer'
import {
  listProductDetails,
  updateProduct,
} from '../store/Actions/productActions'
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../store/constant'
import Aux from '../hoc/_Aux'

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productId = match.params.slug

  const [slug, setSlug] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [primaryImage, setPrimaryImage] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    // if (!userInfo || !userInfo.isAdmin) {
    //   history.push('/login')
    // }

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      history.push('/produk')
    } else {
      if (!product.name || product.slug !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setSlug(product.slug)
        setName(product.name)
        setPrice(product.price)
        setPrimaryImage(product.primaryImage)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, userInfo, successUpdate])

  const uploadPrimaryHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(
        '/api/uploads/primary',
        formData,
        config
      )

      setPrimaryImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files
    console.log(e.target.files)
    const formData = new FormData()
    for (let i = 0; i < file.length; i++) {
      formData.append('image', file[i])
    }

    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/uploads', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    try {
      dispatch(
        updateProduct({
          _id: product._id,
          name,
          price,
          primaryImage,
          image,
          slug,
          newSlug: slugify(name),
          brand,
          category,
          description,
          countInStock,
        })
      )
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Aux>
        <Link to='/produk' className='btn btn-light my-3'>
          Go Back
        </Link>
        <Card>
          <Card.Body>
            <FormContainer>
              <h1>Edit Product</h1>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='slug'>
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Slug'
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      disabled
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='imagePrimary'>
                    <Form.Label>Primary</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter image url'
                      value={primaryImage}
                      onChange={(e) => setPrimaryImage(e.target.value)}
                    ></Form.Control>
                    <Form.File
                      id='image-file-primary'
                      label='Choose File'
                      custom
                      onChange={uploadPrimaryHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                  </Form.Group>

                  <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter image url'
                      value={
                        image.length <= 1 ? image : `Ada ${image.length} Image`
                      }
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.File
                      id='image-file'
                      label='Choose File'
                      custom
                      multiple
                      onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                  </Form.Group>

                  <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter brand'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Enter countInStock'
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter category'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      // onReady={(editor) => {
                      //   // You can store the "editor" and use when it is needed.
                      //   console.log('Editor is ready to use!', editor)
                      // }}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setDescription(data)
                      }}
                      // onBlur={(event, editor) => {
                      //   console.log('Blur.', editor)
                      // }}
                      // onFocus={(event, editor) => {
                      //   console.log('Focus.', editor)
                      // }}
                    />
                    {/* <Form.Control
                      type='text'
                      placeholder='Enter description'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      as='textarea'
                    ></Form.Control> */}
                  </Form.Group>

                  <Button type='submit' variant='primary'>
                    Update
                  </Button>
                </Form>
              )}
            </FormContainer>
          </Card.Body>
        </Card>
      </Aux>
    </>
  )
}

export default ProductEditScreen
