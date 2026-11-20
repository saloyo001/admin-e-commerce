
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react'

import { MemoryRouter } from 'react-router-dom'

import Products from '../pages/Products'
import useProducts from '../hooks/useProducts'

jest.mock('../hooks/useProducts', () => jest.fn())

const mockRemoveProduct = jest.fn()

const mockProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Noise cancelling headphones',
    category: 'Electronics',
    price: 3500,
    stock: 15,
    image: 'https://placehold.co/400x300?text=Headphones',
  },
  {
    id: '2',
    name: 'Classic Leather Bag',
    description: 'Handcrafted leather bag',
    category: 'Fashion',
    price: 4800,
    stock: 8,
    image: 'https://placehold.co/400x300?text=Bag',
  },
]

describe('Products page', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useProducts.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: '',
      removeProduct: mockRemoveProduct,
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('displays products from the catalogue', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'Wireless Headphones' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Classic Leather Bag' })
    ).toBeInTheDocument()
  })

  test('displays product prices and stock', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )

    expect(screen.getByText(/KSh 3,500/)).toBeInTheDocument()
    expect(screen.getByText('Stock: 15')).toBeInTheDocument()
  })

  test('filters products by name', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )

    const searchInput = screen.getByPlaceholderText(
      /search products by name or category/i
    )

    fireEvent.change(searchInput, {
      target: { value: 'headphones' },
    })

    expect(
      screen.getByRole('heading', { name: 'Wireless Headphones' })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('heading', { name: 'Classic Leather Bag' })
    ).not.toBeInTheDocument()
  })

  test('filters products by category', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )

    const searchInput = screen.getByPlaceholderText(
      /search products by name or category/i
    )

    fireEvent.change(searchInput, {
      target: { value: 'fashion' },
    })

    expect(
      screen.getByRole('heading', { name: 'Classic Leather Bag' })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('heading', { name: 'Wireless Headphones' })
    ).not.toBeInTheDocument()
  })

  test('displays a message when no products match the search', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )

    const searchInput = screen.getByPlaceholderText(
      /search products by name or category/i
    )

    fireEvent.change(searchInput, {
      target: { value: 'Nonexistent product' },
    })

    expect(screen.getByText('No products found')).toBeInTheDocument()
  })

  test('deletes a product after administrator confirmation', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true)
    mockRemoveProduct.mockResolvedValue(undefined)

    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )

    const deleteButtons = screen.getAllByRole('button', {
      name: /delete/i,
    })

    fireEvent.click(deleteButtons[0])

    expect(window.confirm).toHaveBeenCalled()

    await waitFor(() => {
      expect(mockRemoveProduct).toHaveBeenCalledWith('1')
    })
  })

  test('does not delete a product when administrator cancels', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false)

    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    )

    const deleteButtons = screen.getAllByRole('button', {
      name: /delete/i,
    })

    fireEvent.click(deleteButtons[0])

    expect(window.confirm).toHaveBeenCalled()
    expect(mockRemoveProduct).not.toHaveBeenCalled()
  })
})
