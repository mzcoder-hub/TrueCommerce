import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

// @Desc   Create a Category
// @Route  POST /api/category/create
// @access Private/Admin

const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: 'Uncategorize',
    slug: 'uncategorize',
    description: 'Uncategorize Product',
    icon: '',
  })

  const createCategory = await category.save()

  res.status(201).json(createCategory)
})

// @Desc   Update a Product
// @Route  PUT /api/category/:id
// @access Private/Admin

const updateCategory = asyncHandler(async (req, res) => {
  const { name, newSlug, description, icon } = req.body

  const category = await Category.findOne({ slug: req.params.slug })

  if (category) {
    category.name = name
    category.description = description
    category.slug = newSlug
    category.icon = icon

    try {
      const updateCategory = await category.save()

      res.status(201).json(updateCategory)
    } catch (error) {
      console.log(error)
    }
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @desc    Fetch single Category
// @route   GET /api/category/ && /api/category/:id
// @access  Public/Admin

const getCategoryById = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const category = await Category.findById(req.params.id)

    if (category) {
      res.json(category)
    } else {
      res.status(404)
      throw new Error('Category not found')
    }
  } else {
    const category = await Category.find({})

    if (category) {
      res.json(category)
    } else {
      res.status(404)
      throw new Error('Category not found')
    }
  }
})

// @desc    Fetch single Category by Slug
// @route   GET /api/category/:slug
// @access  Public/Admin

const getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug })

  if (category) {
    res.json(category)
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

// @Desc   Delete a Product
// @Route  DELETE /api/category/:id
// @access Private/Admin

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)

  if (Category) {
    await category.remove()
    res.json({ message: 'Category Remove' })
  } else {
    res.status(404)
    throw new Error('Category not found')
  }
})

export {
  createCategory,
  getCategoryById,
  getCategoryBySlug,
  deleteCategory,
  updateCategory,
}
