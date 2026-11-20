
const { TextEncoder, TextDecoder } = require('node:util')

// Provide browser-compatible encoding APIs for Jest
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Load additional testing-library matchers
require('@testing-library/jest-dom')
