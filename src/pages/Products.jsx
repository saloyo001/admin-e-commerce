
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

export default function Products() {
  const { products, loading, error, removeProduct } = useProducts()

  const [searchTerm, setSearchTerm] = useState('')

  // Filter products using the search input
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase()

    return (
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
    )
  })

  async function handleDelete(productId) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmed) return

    try {
      await removeProduct(productId)
    } catch (err) {
      console.error('Could not delete product:', err)
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">CATALOGUE</p>
          <h1>Products</h1>
          <p>View and manage your store products.</p>
        </div>

        <Link to="/products/new" className="primary-button">
          + Add Product
        </Link>
      </div>

      {/* SEARCH */}
      <div className="search-container">
        <input
          type="search"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <span>{filteredProducts.length} products found</span>
      </div>

      {loading && <p>Loading products...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="product-card-content">
                <p className="eyebrow">{product.category}</p>

                <h2>{product.name}</h2>

                <p>
                  KSh {Number(product.price).toLocaleString()}
                </p>

                <p>Stock: {product.stock}</p>

                <div className="product-actions">
                  <Link to={`/products/${product.id}`}>
                    View Details
                  </Link>

                  <Link to={`/products/${product.id}/edit`}>
                    Edit Product
                  </Link>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try a different product name or category.</p>
        </div>
      )}
    </section>
  )
}
