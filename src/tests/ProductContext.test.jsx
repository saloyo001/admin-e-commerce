
import { act, renderHook, waitFor } from '@testing-library/react'

import { ProductProvider } from '../context/ProductContext'
import useProducts from '../hooks/useProducts'

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/api'

jest.mock('../services/api', () => ({
  getProducts: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}))

const mockProduct = {
  id: '1',
  name: 'Wireless Headphones',
  description: 'Noise cancelling headphones',
  category: 'Electronics',
  price: 3500,
  stock: 15,
  image: 'https://placehold.co/400x300?text=Headphones',
}

function createWrapper() {
  return function Wrapper({ children }) {
    return <ProductProvider>{children}</ProductProvider>
  }
}

describe('ProductContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    getProducts.mockResolvedValue([])
    createProduct.mockImplementation(async (product) => ({
      id: '2',
      ...product,
    }))
    updateProduct.mockImplementation(async (id, updates) => ({
      ...mockProduct,
      ...updates,
      id,
    }))
    deleteProduct.mockResolvedValue(null)
  })

  test('fetches and shares products with consuming components', async () => {
    getProducts.mockResolvedValue([mockProduct])

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.products).toEqual([mockProduct])
    })

    expect(getProducts).toHaveBeenCalledTimes(1)
    expect(result.current.loading).toBe(false)
  })

  test('adds a product to shared state', async () => {
    const newProduct = {
      name: 'Bluetooth Speaker',
      description: 'Portable rechargeable speaker',
      category: 'Electronics',
      price: 2500,
      stock: 12,
      image: 'https://placehold.co/400x300?text=Speaker',
    }

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    await act(async () => {
      await result.current.addProduct(newProduct)
    })

    expect(createProduct).toHaveBeenCalledWith(newProduct)

    expect(result.current.products).toEqual([
      { id: '2', ...newProduct },
    ])
  })

  test('updates a product in shared state', async () => {
    getProducts.mockResolvedValue([mockProduct])

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.products).toEqual([mockProduct])
    })

    await act(async () => {
      await result.current.editProduct('1', {
        price: 4000,
        stock: 20,
      })
    })

    expect(updateProduct).toHaveBeenCalledWith('1', {
      price: 4000,
      stock: 20,
    })

    expect(result.current.products[0].price).toBe(4000)
    expect(result.current.products[0].stock).toBe(20)
  })

  test('removes a product from shared state', async () => {
    getProducts.mockResolvedValue([mockProduct])

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.products).toEqual([mockProduct])
    })

    await act(async () => {
      await result.current.removeProduct('1')
    })

    expect(deleteProduct).toHaveBeenCalledWith('1')
    expect(result.current.products).toEqual([])
  })

  test('stores an error when fetching products fails', async () => {
    getProducts.mockRejectedValue(
      new Error('Unable to fetch products')
    )

    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Unable to fetch products')
    expect(result.current.products).toEqual([])
  })
})
