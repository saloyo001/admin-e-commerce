
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Home from '../pages/Home'
import useProducts from '../hooks/useProducts'

jest.mock('../hooks/useProducts', () => jest.fn())

const mockProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 3500,
    stock: 15,
  },
  {
    id: '2',
    name: 'Modern Table Lamp',
    category: 'Home',
    price: 2200,
    stock: 3,
  },
]

describe('Dashboard page', () => {
  beforeEach(() => {
    useProducts.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: '',
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('displays the dashboard heading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'Dashboard' })
    ).toBeInTheDocument()
  })

  test('calculates the total number of products', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('calculates the total inventory value', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    // (3500 x 15) + (2200 x 3) = 59,100
    expect(screen.getByText('KSh 59,100')).toBeInTheDocument()
  })

  test('counts products with low stock', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(
      screen.getByText('Products with 5 or fewer units')
    ).toBeInTheDocument()
  })

  test('displays recently added products', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'Recently Added Products' })
    ).toBeInTheDocument()

    expect(
      screen.getByText('Modern Table Lamp')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Wireless Headphones')
    ).toBeInTheDocument()
  })

  test('displays a loading message', () => {
    useProducts.mockReturnValue({
      products: [],
      loading: true,
      error: '',
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByText('Loading dashboard statistics...')
    ).toBeInTheDocument()
  })

  test('displays an error when products cannot be loaded', () => {
    useProducts.mockReturnValue({
      products: [],
      loading: false,
      error: 'Unable to load products',
    })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(
      screen.getByText('Unable to load products')
    ).toBeInTheDocument()
  })
})
