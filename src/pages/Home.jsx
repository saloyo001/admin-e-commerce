
import { Link } from 'react-router-dom'

export default function Home() {
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

      <div className="stats-grid">
        <article className="stat-card">
          <p>Total Products</p>
          <h2>0</h2>
          <span>Products in your store</span>
        </article>

        <article className="stat-card">
          <p>Store Status</p>
          <h2>Active</h2>
          <span>Your store is ready to manage</span>
        </article>
      </div>

      <div className="welcome-card">
        <p className="eyebrow">GET STARTED</p>
        <h2>Your store, your control.</h2>
        <p>
          Add products, update prices, manage your catalogue
          and search through your inventory from one place.
        </p>

        <Link to="/products" className="text-link">
          View all products →
        </Link>
      </div>
    </section>
  )
}
