
import { useEffect, useId, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import { validateProduct } from '../utils/validateProduct'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const formId = useId()

  const {
    products,
    loading,
    error: apiError,
    editProduct,
  } = useProducts()

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  // Find the selected product
  const product = products.find(
    (item) => String(item.id) === String(id)
  )

  // Load the existing product information into the form
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        price: String(product.price ?? ''),
        stock: String(product.stock ?? ''),
        image: product.image || '',
      })

      setValidationErrors({})
      setFormError('')
    }
  }, [product])

  // Update form values and validate corrected fields
  function handleChange(event) {
    const { name, value } = event.target

    const updatedForm = {
      ...form,
      [name]: value,
    }

    setForm(updatedForm)

    const updatedValidation = validateProduct(updatedForm)

    setValidationErrors((currentErrors) => {
      const nextErrors = { ...currentErrors }

      if (updatedValidation[name]) {
        nextErrors[name] = updatedValidation[name]
      } else {
        delete nextErrors[name]
      }

      return nextErrors
    })

    setFormError('')
  }

  // Save updated product information
  async function handleSubmit(event) {
    event.preventDefault()

    const errors = validateProduct(form)

    setValidationErrors(errors)

    if (Object.keys(errors).length > 0) {
      setFormError('Please correct the highlighted fields.')
      return
    }

    setFormError('')
    setSubmitting(true)

    try {
      await editProduct(id, {
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        image: form.image.trim() ||
          'https://placehold.co/400x300?text=Product',
      })

      navigate('/products')
    } catch (err) {
      setFormError(err.message || 'Could not update the product.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <p>Loading product details...</p>
  }

  if (apiError && !product) {
    return (
      <section>
        <h1>Unable to load product</h1>
        <p className="error-message">{apiError}</p>
        <Link to="/products" className="text-link">
          Return to Products
        </Link>
      </section>
    )
  }

  if (!product) {
    return (
      <section className="empty-state">
        <h1>Product not found</h1>
        <p>This product may have been deleted or does not exist.</p>

        <Link to="/products" className="text-link">
          Return to Products
        </Link>
      </section>
    )
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">CATALOGUE</p>
          <h1>Edit Product</h1>
          <p>Update the information for {product.name}.</p>
        </div>

        <Link to="/products" className="secondary-button">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="form-card" noValidate>
        {formError && (
          <p className="error-message" role="alert">
            {formError}
          </p>
        )}

        {!formError && apiError && (
          <p className="error-message" role="alert">
            {apiError}
          </p>
        )}

        {/* PRODUCT NAME */}
        <div className="form-group">
          <label htmlFor={`${formId}-name`}>
            Product Name
          </label>

          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            minLength={2}
            maxLength={80}
            required
            aria-invalid={Boolean(validationErrors.name)}
            aria-describedby={
              validationErrors.name
                ? `${formId}-name-error`
                : undefined
            }
          />

          {validationErrors.name && (
            <small
              id={`${formId}-name-error`}
              className="field-error"
            >
              {validationErrors.name}
            </small>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label htmlFor={`${formId}-description`}>
            Description
          </label>

          <textarea
            id={`${formId}-description`}
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            minLength={10}
            maxLength={500}
            required
            aria-invalid={Boolean(validationErrors.description)}
            aria-describedby={
              validationErrors.description
                ? `${formId}-description-error`
                : undefined
            }
          />

          {validationErrors.description && (
            <small
              id={`${formId}-description-error`}
              className="field-error"
            >
              {validationErrors.description}
            </small>
          )}
        </div>

        <div className="form-grid">

          {/* CATEGORY */}
          <div className="form-group">
            <label htmlFor={`${formId}-category`}>
              Category
            </label>

            <select
              id={`${formId}-category`}
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              aria-invalid={Boolean(validationErrors.category)}
              aria-describedby={
                validationErrors.category
                  ? `${formId}-category-error`
                  : undefined
              }
            >
              <option value="">Choose a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>

            {validationErrors.category && (
              <small
                id={`${formId}-category-error`}
                className="field-error"
              >
                {validationErrors.category}
              </small>
            )}
          </div>

          {/* PRICE */}
          <div className="form-group">
            <label htmlFor={`${formId}-price`}>
              Price (KSh)
            </label>

            <input
              id={`${formId}-price`}
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
              aria-invalid={Boolean(validationErrors.price)}
              aria-describedby={
                validationErrors.price
                  ? `${formId}-price-error`
                  : undefined
              }
            />

            {validationErrors.price && (
              <small
                id={`${formId}-price-error`}
                className="field-error"
              >
                {validationErrors.price}
              </small>
            )}
          </div>

          {/* STOCK */}
          <div className="form-group">
            <label htmlFor={`${formId}-stock`}>
              Available Stock
            </label>

            <input
              id={`${formId}-stock`}
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              min="0"
              step="1"
              required
              aria-invalid={Boolean(validationErrors.stock)}
              aria-describedby={
                validationErrors.stock
                  ? `${formId}-stock-error`
                  : undefined
              }
            />

            {validationErrors.stock && (
              <small
                id={`${formId}-stock-error`}
                className="field-error"
              >
                {validationErrors.stock}
              </small>
            )}
          </div>
        </div>

        {/* IMAGE URL */}
        <div className="form-group">
          <label htmlFor={`${formId}-image`}>
            Product Image URL
          </label>

          <input
            id={`${formId}-image`}
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            aria-invalid={Boolean(validationErrors.image)}
            aria-describedby={
              validationErrors.image
                ? `${formId}-image-error`
                : `${formId}-image-help`
            }
          />

          {validationErrors.image && (
            <small
              id={`${formId}-image-error`}
              className="field-error"
            >
              {validationErrors.image}
            </small>
          )}

          {!validationErrors.image && (
            <small id={`${formId}-image-help`}>
              Optional. A placeholder image is used when left blank.
            </small>
          )}
        </div>

        {/* FORM ACTIONS */}
        <div className="form-actions">
          <Link to="/products" className="secondary-button">
            Cancel
          </Link>

          <button
            type="submit"
            className="primary-button"
            disabled={submitting}
          >
            {submitting ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </section>
  )
}
