
import { Link, useParams } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

export default function ProductDetails() {
  const { id } = useParams()

  const { products, loading, error } = useProducts()

  const product = products.find(
    (item) => String(item.id) === String(id)
  )

  if (loading) {
    return <p>Loading product details...</p>
  }

  if (error) {
    return (
      <section>
        <h1>Unable to load product</h1>
        <p className="error-message">{error}</p>
        <Link to="/products">Back to Products</Link>
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
          <p className="eyebrow">CATALOGUE / PRODUCT DETAILS</p>
          <h1>{product.name}</h1>
          <p>View all information about this product.</p>
        </div>

        <Link to="/products" className="secondary-button">
          Back to Products
        </Link>
      </div>

      <div className="details-card">
        <div className="details-image">
          <img
            src={
              product.image ||
              'https://placehold.co/600x450?text=Product'
            }
            alt={product.name}
          />
        </div>

        <div className="details-information">
          <span className="eyebrow">{product.category}</span>

          <h2>{product.name}</h2>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-price">
            KSh {Number(product.price).toLocaleString()}
          </div>

          <div className="details-stock">
            <span>Available stock</span>
            <strong>{product.stock} units</strong>
          </div>

          <div className="details-actions">
            <Link
              to={`/products/${product.id}/edit`}
              className="primary-button"
            >
              Edit Product
            </Link>

            <Link to="/products" className="secondary-button">
              Back to Catalogue
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
