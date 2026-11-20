
import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

export default function Home() {
  const { products, loading, error } = useProducts()

  // Calculate dashboard statistics
  const totalProducts = products.length

  const inventoryValue = products.reduce(
    (total, product) =>
      total + Number(product.price) * Number(product.stock),
    0
  )

  // Products with 5 or fewer units remaining
  const lowStockProducts = products.filter(
    (product) => Number(product.stock) <= 5
  ).length

  // Display the latest products in the catalogue
  const recentProducts = [...products].slice(-3).reverse()

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p>Manage your store and keep track of your products.</p>
        </div>

        <Link to="/products/new" className="primary-button">
          + Add Product
        </Link>
      </div>

      {loading && <p>Loading dashboard statistics...</p>}

      {error && (
        <p className="error-message">{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="stats-grid">
            <article className="stat-card">
              <p>Total Products</p>
              <h2>{totalProducts}</h2>
              <span>Products in your catalogue</span>
            </article>

            <article className="stat-card">
              <p>Inventory Value</p>
              <h2>
                KSh {inventoryValue.toLocaleString()}
              </h2>
              <span>Total value of available stock</span>
            </article>

            <article className="stat-card">
              <p>Low Stock Alerts</p>
              <h2>{lowStockProducts}</h2>
              <span>Products with 5 or fewer units</span>
            </article>

            <article className="stat-card">
              <p>Store Status</p>
              <h2>Active</h2>
              <span>Your catalogue is connected</span>
            </article>
          </div>

          <div className="welcome-card recent-products">
            <div className="recent-heading">
              <div>
                <p className="eyebrow">CATALOGUE ACTIVITY</p>
                <h2>Recently Added Products</h2>
              </div>

              <Link to="/products" className="text-link">
                View All →
              </Link>
            </div>

            {recentProducts.length > 0 ? (
              <div className="recent-product-list">
                {recentProducts.map((product) => (
                  <div
                    className="recent-product"
                    key={product.id}
                  >
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.category}</p>
                    </div>

                    <div className="recent-product-info">
                      <strong>
                        KSh {Number(product.price).toLocaleString()}
                      </strong>
                      <span>{product.stock} units</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products have been added yet.</p>
            )}
          </div>
        </>
      )}
    </section>
  )
}
