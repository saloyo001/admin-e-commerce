
import { render, screen } from '@testing-library/react'
import Header from '../components/Header'

describe('Header component', () => {
  test('displays the welcome message', () => {
    render(<Header />)

    expect(
      screen.getByRole('heading', { name: /welcome back/i })
    ).toBeInTheDocument()
  })

  test('displays the administrator profile', () => {
    render(<Header />)

    expect(
      screen.getByText(/administrator/i)
    ).toBeInTheDocument()
  })
})
