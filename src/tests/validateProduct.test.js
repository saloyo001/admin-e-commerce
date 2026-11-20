
import { validateProduct } from '../utils/validateProduct'

const validProduct = {
  name: 'Wireless Headphones',
  description: 'High-quality wireless headphones with noise cancellation.',
  category: 'Electronics',
  price: '3500',
  stock: '15',
  image: 'https://example.com/headphones.jpg',
}

describe('validateProduct', () => {
  test('accepts a valid product', () => {
    expect(validateProduct(validProduct)).toEqual({})
  })

  test('rejects a product name shorter than 2 characters', () => {
    const errors = validateProduct({
      ...validProduct,
      name: 'A',
    })

    expect(errors.name).toBeTruthy()
  })

  test('rejects a product name longer than 80 characters', () => {
    const errors = validateProduct({
      ...validProduct,
      name: 'A'.repeat(81),
    })

    expect(errors.name).toBeTruthy()
  })

  test('rejects a description shorter than 10 characters', () => {
    const errors = validateProduct({
      ...validProduct,
      description: 'Nice',
    })

    expect(errors.description).toBeTruthy()
  })

  test('rejects an invalid category', () => {
    const errors = validateProduct({
      ...validProduct,
      category: 'Food',
    })

    expect(errors.category).toBeTruthy()
  })

  test('rejects a negative or zero price', () => {
    const negativePrice = validateProduct({
      ...validProduct,
      price: '-100',
    })

    const zeroPrice = validateProduct({
      ...validProduct,
      price: '0',
    })

    expect(negativePrice.price).toBeTruthy()
    expect(zeroPrice.price).toBeTruthy()
  })

  test('rejects stock quantities containing decimals', () => {
    const errors = validateProduct({
      ...validProduct,
      stock: '2.5',
    })

    expect(errors.stock).toBeTruthy()
  })

  test('rejects negative stock quantities', () => {
    const errors = validateProduct({
      ...validProduct,
      stock: '-5',
    })

    expect(errors.stock).toBeTruthy()
  })

  test('rejects an invalid image URL', () => {
    const errors = validateProduct({
      ...validProduct,
      image: 'not-a-url',
    })

    expect(errors.image).toBeTruthy()
  })

  test('allows an empty image URL', () => {
    const errors = validateProduct({
      ...validProduct,
      image: '',
    })

    expect(errors.image).toBeUndefined()
  })
})
