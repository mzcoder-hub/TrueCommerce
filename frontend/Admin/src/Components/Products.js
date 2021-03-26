import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import {Row, Col, Card, Table, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../store/Actions/productActions'
import Message from './Compo/Message'
import Loader from './Compo/Loader'
import { PRODUCT_CREATE_RESET } from '../store/constant'
import Paginate from './Compo/Paginate'
import Aux from "../hoc/_Aux"

const ProductsComponent = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  
  const dispatch = useDispatch()
  
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList
  
  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete
  
  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate
  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
 
    if (!userInfo) {
      history.push('/auth/signin')
    }
    
    if (successCreate) {
      history.push(`/produk/${createdProduct.slug}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])
  
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }
  
  const createProductHandler = () => {
    dispatch(createProduct())
  }
  
  function rupiahConvert(nominal){
      const 	bilangan = nominal;
      
      var	number_string = bilangan.toString(),
      split	= number_string.split(','),
      sisa 	= split[0].length % 3,
      rupiah 	= split[0].substr(0, sisa),
      ribuan 	= split[0].substr(sisa).match(/\d{1,3}/gi)
        
    if (ribuan) {
      const separator = sisa ? '.' : ''
      rupiah += separator + ribuan.join('.')
    }
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah

    return rupiah
  }
  return (
    <Aux>
    <Row>
    <Col>
    <Card>
    <Card.Body>
    <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='feather icon-edit-1'></i> Create Product
          </Button>
    </Col>
    {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
    <Table responsive>
    <thead>
    <tr>
    <th>NAME</th>
    <th>PRICE</th>
    <th>CATEGORY</th>
    <th>BRAND</th>
    <th></th>
    </tr>
    </thead>
    <tbody>
    {products.map((product) => (
      <tr key={product._id}>
      <td>{product.name}</td>
      <td>Rp {rupiahConvert(product.price)},- </td>
      <td>{product.category}</td>
      <td>{product.brand}</td>
      <td>
      <LinkContainer to={`/produk/${product.slug}/edit`}>
      <Button 
      className='label theme-bg text-white f-12' 
      title="Edit" > Edit
      <li className='feather icon-edit-1'  style={{listStyleType: "none"}}></li>
      </Button>
      </LinkContainer>
      <Button 
      title="Delete"
      className='label theme-bg2 text-white f-12'
      onClick={() => deleteHandler(product._id)}
      > Delete
      <li className='feather icon-delete'  style={{listStyleType: "none"}}></li>
      </Button>
      </td>
      </tr>
      ))}
      </tbody>
      </Table>
      <Paginate pages={pages} page={page} isAdmin={true} />
      </>
      )}
      </Card.Body>
      </Card>
      </Col>
      </Row>
      </Aux>
      )
    }
    export default ProductsComponent;