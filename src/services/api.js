
const API_URL = 'http://localhost:3000/products'

// Reusable function for making API requests
async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || `Request failed: ${response.status}`)
  }

  return data
}

// READ: Get all products
export function getProducts() {
  return request(API_URL)
}

// CREATE: Add a new product
export function createProduct(product) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(product),
  })
}

// UPDATE: Edit an existing product
export function updateProduct(id, updates) {
  return request(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })
}

// DELETE: Remove a product
export function deleteProduct(id) {
  return request(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}
