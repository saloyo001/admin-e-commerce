
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api'

// Create the shared product context
export const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch products from the backend
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch the catalogue when the provider first loads
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // CREATE
 const addProduct = useCallback(async (product) => {
  try {
    setError('')
    const newProduct = await createProduct(product)

    setProducts((current) => [...current, newProduct])
    return newProduct
  } catch (err) {
    setError(err.message)
    throw err
  }
}, [])

const editProduct = useCallback(async (id, updates) => {
  try {
    setError('')
    const updatedProduct = await updateProduct(id, updates)

    setProducts((current) =>
      current.map((product) =>
        String(product.id) === String(id) ? updatedProduct : product
      )
    )

    return updatedProduct
  } catch (err) {
    setError(err.message)
    throw err
  }
}, [])

const removeProduct = useCallback(async (id) => {
  try {
    setError('')
    await deleteProduct(id)

    setProducts((current) =>
      current.filter(
        (product) => String(product.id) !== String(id)
      )
    )
  } catch (err) {
    setError(err.message)
    throw err
  }
}, [])

  // Share the same values with every consuming component
  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      fetchProducts,
      addProduct,
      editProduct,
      removeProduct,
    }),
    [products, loading, error, fetchProducts, addProduct, editProduct, removeProduct]
  )

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}
