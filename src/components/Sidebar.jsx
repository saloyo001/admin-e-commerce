
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">S</span>
        <span>Store Admin</span>
      </div>

      <p className="sidebar-label">MENU</p>

      <nav className="sidebar-nav">
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/products">
          Products
        </NavLink>

        <NavLink to="/products/new">
          Add Product
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        Product Management Portal
      </div>
    </aside>
  )
}
