
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react'

import { MemoryRouter, Routes, Route } from 'react-router-dom'

import AddProduct from '../pages/AddProduct'
import useProducts from '../hooks/useProducts'

jest.mock('../hooks/useProducts', () => jest.fn())

const mockAddProduct = jest.fn()

function renderAddProduct() {
  return render(
    <MemoryRouter initialEntries={['/products/new']}>
      <Routes>
        <Route path="/products/new" element={<AddProduct />} />
        <Route
          path="/products"
          element={<h1>Products Catalogue</h1>}
        />
      </Routes>
    </MemoryRouter>
  )
}

function fillProductForm() {
  fireEvent.change(screen.getByLabelText(/product name/i), {
    target: { value: 'Bluetooth Speaker' },
  })

  fireEvent.change(screen.getByLabelText(/description/i), {
    target: { value: 'Portable rechargeable speaker' },
  })

  fireEvent.change(screen.getByLabelText(/category/i), {
    target: { value: 'Electronics' },
  })

  fireEvent.change(screen.getByLabelText(/price/i), {
    target: { value: '2500' },
  })

  fireEvent.change(screen.getByLabelText(/available stock/i), {
    target: { value: '12' },
  })
}

describe('Add Product page', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useProducts.mockReturnValue({
      addProduct: mockAddProduct,
      error: '',
    })
  })

  test('displays the new product form', () => {
    renderAddProduct()

    expect(
      screen.getByRole('heading', { name: 'Add Product' })
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(/product name/i)
    ).toBeInTheDocument()

    expect(
      screen.getByLabelText(/description/i)
    ).toBeInTheDocument()
  })

  test('submits product information successfully', async () => {
    mockAddProduct.mockResolvedValue({
      id: '5',
      name: 'Bluetooth Speaker',
    })

    renderAddProduct()

    fillProductForm()

    fireEvent.click(
      screen.getByRole('button', { name: /save product/i })
    )

    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith({
        name: 'Bluetooth Speaker',
        description: 'Portable rechargeable speaker',
        category: 'Electronics',
        price: 2500,
        stock: 12,
        image: 'https://placehold.co/400x300?text=New+Product',
      })
    })

    expect(
      await screen.findByRole('heading', {
        name: 'Products Catalogue',
      })
    ).toBeInTheDocument()
  })

  test('displays an error when product creation fails', async () => {
    mockAddProduct.mockRejectedValue(
      new Error('Server unavailable')
    )

    renderAddProduct()

    fillProductForm()

    fireEvent.click(
      screen.getByRole('button', { name: /save product/i })
    )

    expect(
      await screen.findByRole('alert')
    ).toHaveTextContent('Server unavailable')
  })
})
