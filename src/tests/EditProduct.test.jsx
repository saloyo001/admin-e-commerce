
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react'

import { MemoryRouter, Routes, Route } from 'react-router-dom'

import EditProduct from '../pages/EditProduct'
import useProducts from '../hooks/useProducts'

jest.mock('../hooks/useProducts', () => jest.fn())

const mockEditProduct = jest.fn()

const mockProduct = {
  id: '1',
  name: 'Wireless Headphones',
  description: 'Noise cancelling headphones',
  category: 'Electronics',
  price: 3500,
  stock: 15,
  image: 'https://placehold.co/400x300?text=Headphones',
}

function renderEditProduct() {
  return render(
    <MemoryRouter initialEntries={['/products/1/edit']}>
      <Routes>
        <Route
          path="/products/:id/edit"
          element={<EditProduct />}
        />
        <Route
          path="/products"
          element={<h1>Products Catalogue</h1>}
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('Edit Product page', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useProducts.mockReturnValue({
      products: [mockProduct],
      loading: false,
      error: '',
      editProduct: mockEditProduct,
    })
  })

  test('displays the existing product information', async () => {
    renderEditProduct()

    expect(
      await screen.findByDisplayValue('Wireless Headphones')
    ).toBeInTheDocument()

    expect(
      screen.getByDisplayValue('3500')
    ).toBeInTheDocument()

    expect(
      screen.getByDisplayValue('15')
    ).toBeInTheDocument()
  })

  test('updates the product successfully', async () => {
    mockEditProduct.mockResolvedValue({
      ...mockProduct,
      price: 4000,
      stock: 20,
    })

    renderEditProduct()

    const priceInput = await screen.findByLabelText(/price/i)
    const stockInput = screen.getByLabelText(/available stock/i)

    fireEvent.change(priceInput, {
      target: { value: '4000' },
    })

    fireEvent.change(stockInput, {
      target: { value: '20' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: /save changes/i })
    )

    await waitFor(() => {
      expect(mockEditProduct).toHaveBeenCalledWith('1', {
        name: 'Wireless Headphones',
        description: 'Noise cancelling headphones',
        category: 'Electronics',
        price: 4000,
        stock: 20,
        image: mockProduct.image,
      })
    })

    expect(
      await screen.findByRole('heading', {
        name: 'Products Catalogue',
      })
    ).toBeInTheDocument()
  })

  test('displays an error when updating fails', async () => {
    mockEditProduct.mockRejectedValue(
      new Error('Update failed')
    )

    renderEditProduct()

    const priceInput = await screen.findByLabelText(/price/i)

    fireEvent.change(priceInput, {
      target: { value: '4500' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: /save changes/i })
    )

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent('Update failed')
  })
})
