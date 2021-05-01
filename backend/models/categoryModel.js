import mongoose from 'mongoose'

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model('Category', CategorySchema)

export default Category