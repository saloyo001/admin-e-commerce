
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

describe('Sidebar navigation', () => {
  test('displays all main navigation links', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', { name: 'Dashboard' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: 'Products' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('link', { name: 'Add Product' })
    ).toBeInTheDocument()
  })

  test('links point to the correct routes', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', { name: 'Dashboard' })
    ).toHaveAttribute('href', '/')

    expect(
      screen.getByRole('link', { name: 'Products' })
    ).toHaveAttribute('href', '/products')

    expect(
      screen.getByRole('link', { name: 'Add Product' })
    ).toHaveAttribute('href', '/products/new')
  })
})
