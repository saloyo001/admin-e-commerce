
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import { ProductProvider } from './context/ProductContext'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import Home from './pages/Home'
import Products from './pages/Products'
import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails'
import EditProduct from './pages/EditProduct'

function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Header />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<AddProduct />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
          </Route>
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  )
}

export default App
