
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

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

  // Find the product selected by the administrator
  const product = products.find(
    (item) => String(item.id) === String(id)
  )

  // Put the existing product information into the form
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
    }
  }, [product])

  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
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

  if (!product) {
    return (
      <section>
        <h1>Product not found</h1>
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

      <form onSubmit={handleSubmit} className="form-card">
        {(formError || apiError) && (
          <p className="error-message" role="alert">
            {formError || apiError}
          </p>
        )}

        <div className="form-group">
          <label htmlFor="edit-name">Product Name</label>
          <input
            id="edit-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-description">Description</label>
          <textarea
            id="edit-description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="edit-category">Category</label>
            <select
              id="edit-category"
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
            <label htmlFor="edit-price">Price (KSh)</label>
            <input
              id="edit-price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-stock">Available Stock</label>
            <input
              id="edit-stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              min="0"
              step="1"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="edit-image">Product Image URL</label>
          <input
            id="edit-image"
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
          />
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
            {submitting ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </section>
  )
}
