
export function validateProduct(product) {
  const errors = {}

  // Validate product name
  const name = product.name?.trim() || ''

  if (name.length < 2) {
    errors.name = 'Product name must contain at least 2 characters.'
  } else if (name.length > 80) {
    errors.name = 'Product name cannot exceed 80 characters.'
  }

  // Validate description
  const description = product.description?.trim() || ''

  if (description.length < 10) {
    errors.description = 'Description must contain at least 10 characters.'
  } else if (description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters.'
  }

  // Validate category
  const categories = [
    'Electronics',
    'Fashion',
    'Home',
    'Accessories',
    'Other',
  ]

  if (!categories.includes(product.category)) {
    errors.category = 'Please select a valid product category.'
  }

  // Validate price
  const price = Number(product.price)

  if (
    product.price === '' ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    errors.price = 'Price must be greater than zero.'
  }

  // Validate stock
  const stock = Number(product.stock)

  if (
    product.stock === '' ||
    !Number.isInteger(stock) ||
    stock < 0
  ) {
    errors.stock = 'Stock must be a whole number of zero or more.'
  }

  // Validate image URL when provided
  const image = product.image?.trim() || ''

  if (image) {
    try {
      const imageUrl = new URL(image)

      if (!['http:', 'https:'].includes(imageUrl.protocol)) {
        errors.image = 'Image must use a valid HTTP or HTTPS URL.'
      }
    } catch {
      errors.image = 'Please enter a valid image URL.'
    }
  }

  return errors
}
