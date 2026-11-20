# E-Commerce Admin Portal

A React-based e-commerce administration portal that allows administrators to manage an online store's product catalogue. The application supports product creation, viewing, editing, deletion, dynamic searching and dashboard inventory statistics.

**GitHub Repository:** https://github.com/saloyo001/admin-e-commerce

---

## 1. Project Overview

The E-Commerce Admin Portal provides a central dashboard for managing products in an online store.

Administrators can:

- View an overview of store inventory.
- View all available products.
- Add new products to the catalogue.
- View individual product details.
- Edit product information, including prices and stock quantities.
- Delete products.
- Search dynamically by product name or category.
- Receive validation feedback when entering product information.

The application is built as a Single Page Application (SPA) using React and React Router. JSON Server provides a simulated backend for persistent product data.

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| React | Building reusable UI components |
| Vite | Development server and production build |
| JavaScript (ES6+) | Application logic |
| React Router | Client-side navigation |
| React Context API | Shared product state |
| React Hooks | State and lifecycle management |
| JSON Server | Simulated REST API |
| CSS | Responsive application styling |
| Jest | Automated testing |
| React Testing Library | Component and interaction testing |
| Babel | JSX transformation for Jest |
| Git and GitHub | Version control and collaboration workflow |

## 3. Application Features

### Dashboard

The dashboard displays statistics derived from the product catalogue:

- Total number of products.
- Total inventory value.
- Number of products with five or fewer units in stock.
- Recently added catalogue entries.

### Product Management

Administrators can perform all four CRUD operations:

- **Create:** Add products using a form.
- **Read:** View the product catalogue and individual product details.
- **Update:** Edit product information and prices.
- **Delete:** Remove products after confirmation.

### Dynamic Search

The search feature filters the product catalogue as the administrator types. Products can be searched by name or category.

### Form Validation

Both the Add Product and Edit Product forms use a reusable validation function.

Validation checks include:

- Product name length.
- Description length.
- Valid product category.
- Positive product price.
- Valid whole-number stock quantity.
- Valid HTTP or HTTPS image URL when provided.

### Responsive Design

The interface uses responsive CSS layouts to accommodate desktop and smaller screen sizes.

## 4. Project Structure

```text
ecommerce-admin-portal/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── context/
│   │   └── ProductContext.jsx
│   │
│   ├── hooks/
│   │   └── useProducts.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── AddProduct.jsx
│   │   ├── ProductDetails.jsx
│   │   └── EditProduct.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   └── validateProduct.js
│   │
│   ├── tests/
│   │   ├── AddProduct.test.jsx
│   │   ├── EditProduct.test.jsx
│   │   ├── Header.test.jsx
│   │   ├── Home.test.jsx
│   │   ├── ProductContext.test.jsx
│   │   ├── ProductDetails.test.jsx
│   │   ├── Products.test.jsx
│   │   ├── Sidebar.test.jsx
│   │   ├── validateProduct.test.js
│   │   └── setup.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── db.json
├── babel.config.cjs
├── jest.config.cjs
├── package.json
└── README.md
```

## 5. Component Hierarchy

The application uses a parent-child component structure.

```text
App
│
├── BrowserRouter
│   │
│   └── ProductProvider
│       │
│       └── Routes
│           │
│           └── Layout
│               │
│               ├── Sidebar
│               ├── Header
│               │
│               └── Outlet
│                   │
│                   ├── Home
│                   ├── Products
│                   ├── AddProduct
│                   ├── ProductDetails
│                   └── EditProduct
```

The `App` component establishes routing and wraps the application in `ProductProvider`.

The `Layout` component provides a consistent sidebar and header while `Outlet` displays the currently selected page.

## 6. State Management

The application uses React Context API to manage shared product information.

### ProductContext

`ProductContext.jsx` manages:

- Product catalogue state.
- Loading state.
- Error state.
- Product creation.
- Product updates.
- Product deletion.
- Fetching products from the API.

The `ProductProvider` wraps the application routes so that all pages can access the same product state.

### Custom Hook

The `useProducts.js` custom hook uses `useContext` to access the shared ProductContext.

Pages use the hook to access the product data and available CRUD functions without passing product information through multiple layers of props.

### Hooks Implemented

| Hook | Application |
|---|---|
| useState | Form data, search input, loading and error states |
| useEffect | Initial data fetching and input focus |
| useContext | Accessing shared product state |
| useCallback | Stabilising shared asynchronous functions |
| useMemo | Memoising the shared context value |
| useRef | Focusing the product name field |
| useId | Generating unique form field identifiers |
| useParams | Reading product IDs from the URL |
| useNavigate | Navigating after successful form submissions |

## 7. State and Data Relationships

The `ProductProvider` owns the shared product state.

The `useProducts` custom hook exposes that state and its associated functions to the consuming pages.

The main relationships are:

| Component | State or functions accessed |
|---|---|
| Home | Products, loading and error |
| Products | Products, loading, error and removeProduct |
| AddProduct | addProduct and error |
| ProductDetails | Products, loading and error |
| EditProduct | Products, loading, error and editProduct |

Local state is used for individual form values, validation errors and search input.

## 8. Product Data Structure

Product information is stored in `db.json`.

Example:

```json
{
  "products": [
    {
      "id": "1",
      "name": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation.",
      "category": "Electronics",
      "price": 3500,
      "stock": 15,
      "image": "https://placehold.co/400x300?text=Headphones"
    }
  ]
}
```

Each product contains:

| Property | Description |
|---|---|
| id | Unique product identifier |
| name | Product name |
| description | Product description |
| category | Product category |
| price | Product price in Kenyan Shillings |
| stock | Available inventory quantity |
| image | Product image URL |

## 9. API and Data Fetching

JSON Server simulates the backend REST API.

The API requests are centralised in `src/services/api.js`.

### Available Endpoints

| Operation | HTTP Method | Endpoint |
|---|---|---|
| Retrieve all products | GET | `/products` |
| Retrieve one product | GET | `/products/:id` |
| Add a product | POST | `/products` |
| Update a product | PATCH | `/products/:id` |
| Delete a product | DELETE | `/products/:id` |

The `useProducts` hook uses the ProductContext, which communicates with the API service and updates shared state after successful operations.

## 10. Installation and Setup

### Prerequisites

- Node.js
- npm
- Git
- A code editor such as Visual Studio Code

### Clone the repository

```bash
git clone https://github.com/saloyo001/admin-e-commerce.git
```

Enter the project directory:

```bash
cd ecommerce-admin-portal
```

### Install dependencies

```bash
npm install
```

### Start the backend

```bash
npm run server
```

JSON Server runs at:

```text
http://localhost:3000
```

The product API is available at:

```text
http://localhost:3000/products
```

### Start the frontend

Open a second terminal and run:

```bash
npm run dev
```

Open the local address provided by Vite, usually:

```text
http://localhost:5173
```

Both servers must be running for the application to retrieve and modify products.

## 11. Testing

The application uses Jest and React Testing Library for automated testing.

Tests cover:

- Header rendering.
- Sidebar navigation.
- Dashboard statistics.
- Product catalogue rendering.
- Dynamic product searching.
- Product creation.
- Product editing.
- Product details.
- Context API and shared CRUD operations.
- Product form validation.

### Run the tests

```bash
npm test -- --runInBand
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Build for production

```bash
npm run build
```

The current verified test suite contains 43 passing tests across 9 test files. The production build has also completed successfully.

## 12. Git and Version Control

Git and GitHub were used to manage the application's development.

The project uses feature branches to isolate improvements from the main branch.

The feature workflow includes:

1. Creating a feature branch.
2. Implementing and testing the feature.
3. Committing the changes.
4. Pushing the feature branch to GitHub.
5. Creating a pull request.
6. Merging the completed pull request into `main`.
7. Removing the completed feature branch.

Completed feature pull requests include:

- Dashboard statistics.
- Product form validation.

## 13. Learning Outcomes

Through this project, I applied:

- React component architecture.
- State management using React Hooks and Context API.
- Custom hook development.
- Client-side routing using React Router.
- REST API integration.
- Full CRUD functionality.
- Form validation and event handling.
- Automated component and interaction testing.
- Git branching and pull request workflows.
- Responsive frontend development.

## 14. Future Improvements

Potential future improvements include:

- Administrator authentication and role-based access.
- Product image uploads.
- Product category management.
- Pagination for larger catalogues.
- Advanced inventory reporting.
- Improved analytics and sales reporting.

---

**Project:** E-Commerce Admin Portal  
**Repository:** https://github.com/saloyo001/admin-e-commerce  
**Framework:** React + Vite  
**Backend:** JSON Server