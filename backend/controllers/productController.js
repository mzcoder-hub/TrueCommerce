import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @Desc   Fetch All Products
// @Route  Get /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 5
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 })
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @Desc   Fetch Single Products by Slug
// @Route  Get /api/products/slug
// @access Public

const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @Desc   Delete a Product
// @Route  DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product Remove' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @Desc   Create a Product
// @Route  POST /api/products/
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    primaryImage: '/images/sample.jpg',
    brand: 'sample Brand',
    variant: [{ stok: '', ukuran: '', warna: '', harga: '', sku: '' }],
    category: '60871756f5be7134f09c1ae9',
    slug: 'sample-name',
    countInStock: 0,
    numReviews: 0,
    description: 'sample Description',
  })

  const createdProduct = await product.save()

  res.status(201).json(createdProduct)
})

// @Desc   Update a Product
// @Route  PUT /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    primaryImage,
    variant,
    image,
    brand,
    newSlug,
    category,
    countInStock,
  } = req.body

  const product = await Product.findOne({ slug: req.params.slug })

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.slug = newSlug
    product.variant = JSON.parse(variant)
    product.primaryImage = primaryImage
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    try {
      const updateProduct = await product.save()

      res.status(201).json(updateProduct)
    } catch (error) {
      console.log(error)
    }
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @Desc   Create New Review
// @Route  Post /api/products/:id/reviews
// @access Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findOne({ slug: req.params.id })

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()

    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @Desc   Get to Rated Products
// @Route  GET /api/products/top
// @access Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductBySlug,
}
