
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import ProductDetails from '../pages/ProductDetails'
import useProducts from '../hooks/useProducts'

jest.mock('../hooks/useProducts', () => jest.fn())

const mockProduct = {
  id: '1',
  name: 'Wireless Headphones',
  description: 'Noise cancelling headphones',
  category: 'Electronics',
  price: 3500,
  stock: 15,
  image: 'https://placehold.co/400x300?text=Headphones',
}

function renderProductDetails() {
  return render(
    <MemoryRouter initialEntries={['/products/1']}>
      <Routes>
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('Product Details page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('displays the selected product information', () => {
    useProducts.mockReturnValue({
      products: [mockProduct],
      loading: false,
      error: '',
    })

    renderProductDetails()

    expect(
      screen.getByText('Noise cancelling headphones')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Electronics')
    ).toBeInTheDocument()

    expect(
      screen.getByText('KSh 3,500')
    ).toBeInTheDocument()

    expect(
      screen.getByText('15 units')
    ).toBeInTheDocument()
  })

  test('displays a loading message while products are loading', () => {
    useProducts.mockReturnValue({
      products: [],
      loading: true,
      error: '',
    })

    renderProductDetails()

    expect(
      screen.getByText('Loading product details...')
    ).toBeInTheDocument()
  })

  test('displays a message when the product does not exist', () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: '',
    })

    renderProductDetails()

    expect(
      screen.getByRole('heading', { name: 'Product not found' })
    ).toBeInTheDocument()
  })

  test('displays an error when the product request fails', () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: 'Server unavailable',
    })

    renderProductDetails()

    expect(
      screen.getByRole('heading', { name: 'Unable to load product' })
    ).toBeInTheDocument()

    expect(screen.getByText('Server unavailable')).toBeInTheDocument()
  })
})
