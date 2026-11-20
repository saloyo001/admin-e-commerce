
import { useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

export default function AddProduct() {
  const { addProduct, error: apiError } = useProducts()
  const navigate = useNavigate()

  // Generate unique IDs for the form fields
  const formId = useId()

  // Reference the product name input
  const nameInputRef = useRef(null)

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

  // Focus the name field when the page opens
  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  // Update the form when the administrator types
  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  // Save the new product
  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('')
    setSubmitting(true)

    try {
      await addProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        image: form.image.trim() ||
          'https://placehold.co/400x300?text=New+Product',
      })

      // Return to the catalogue after a successful save
      navigate('/products')
    } catch (error) {
      setFormError(error.message || 'Could not save the product.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">CATALOGUE</p>
          <h1>Add Product</h1>
          <p>Add a new item to your store catalogue.</p>
        </div>

        <Link to="/products" className="secondary-button">
          Back to Products
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
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

        <div className="form-group">
          <label htmlFor={`${formId}-name`}>Product Name</label>
          <input
            ref={nameInputRef}
            id={`${formId}-name`}
            name="name"
            type="text"
            placeholder="e.g. Wireless Headphones"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
          />
        </div>

        <div className="form-group">
          <label htmlFor={`${formId}-description`}>Description</label>
          <textarea
            id={`${formId}-description`}
            name="description"
            placeholder="Describe your product..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor={`${formId}-category`}>Category</label>
            <select
              id={`${formId}-category`}
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Choose a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor={`${formId}-price`}>Price (KSh)</label>
            <input
              id={`${formId}-price`}
              name="price"
              type="number"
              placeholder="3500"
              value={form.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor={`${formId}-stock`}>Available Stock</label>
            <input
              id={`${formId}-stock`}
              name="stock"
              type="number"
              placeholder="15"
              value={form.stock}
              onChange={handleChange}
              min="0"
              step="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={`${formId}-image`}>Product Image URL</label>
          <input
            id={`${formId}-image`}
            name="image"
            type="url"
            placeholder="https://example.com/product.jpg"
            value={form.image}
            onChange={handleChange}
          />
          <small>Optional. A placeholder image is used when left blank.</small>
        </div>

        <div className="form-actions">
          <Link to="/products" className="secondary-button">
            Cancel
          </Link>

          <button
            type="submit"
            className="primary-button"
            disabled={submitting}
          >
            {submitting ? 'Saving Product...' : 'Save Product'}
          </button>
        </div>
      </form>
    </section>
  )
}
