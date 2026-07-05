# E-Commerce Website Frontend

A modern React-based e-commerce frontend that works like Amazon. This project showcases a fully-functional shopping experience with product browsing, cart management, user authentication, and seamless checkout flow.

**🚀 Live Demo**: https://e-commerce-website-ten-dusky.vercel.app

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Key Features Explained](#key-features-explained)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Product Browsing**: Browse through a wide variety of products with detailed information
- **Shopping Cart**: Add/remove items, manage quantities, and view cart totals
- **User Authentication**: Secure user login and registration system
- **Order Management**: View purchase history and track orders
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI/UX**: Beautiful animations and smooth transitions using GSAP
- **Real-time Updates**: Dynamic cart and user data updates
- **Payment Integration Ready**: Prepared for payment gateway integration
- **Search & Filter**: Find products easily with search functionality
- **User Profiles**: Manage user information and preferences

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.0.0
- **Build Tool**: Vite 6.3.1 (lightning-fast bundling)
- **Styling**:
  - Tailwind CSS 4.1.18 (utility-first CSS framework)
  - @tailwindcss/vite 4.1.18
  - Tailwind Merge 3.4.0 (merge Tailwind classes efficiently)
- **Routing**: React Router DOM 7.12.0
- **State Management**: React Context API (built-in)
- **HTTP Client**: Axios 1.13.2
- **Animations**: GSAP 3.14.2 (GreenSock Animation Platform)
- **Icons**: React Icons 5.5.0
- **UI Utilities**:
  - Classnames 2.5.1 (conditional CSS classes)
  - Spline 3D Tool 4.1.0 (3D animations)
- **Dev Server**: JSON Server 1.0.0-beta.3 (mock API)
- **Linting**: ESLint 9.22.0
- **Language**: JavaScript (ES Modules)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/basantbansal/Ecommerce_website_frontend.git
   cd Ecommerce_website_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## 🔧 Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api
VITE_BASE_URL=http://localhost:5173

# Payment Gateway (if using)
VITE_PAYMENT_KEY=your_payment_gateway_key

# Other Configuration
VITE_APP_NAME=E-Commerce Store
NODE_ENV=development
```

## ▶️ Running the Application

### Development Mode
```bash
npm start
```
The application will start on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Linter
```bash
npm run lint
```

## 📁 Project Structure

```
Ecommerce_website_frontend/
├── src/
│   ├── index.js              # Entry point with Context providers
│   ├── App.jsx               # Main App component
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── Cart.jsx
│   │   └── ...
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── CartPage.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderHistory.jsx
│   │   └── ...
│   ├── context/              # React Context providers
│   │   ├── cart.jsx          # Cart context
│   │   ├── user.jsx          # User context
│   │   ├── Purchased.jsx     # Purchase history context
│   │   └── ...
│   ├── styles/               # CSS and Tailwind configs
│   │   └── index.css
│   ├── utils/                # Utility functions
│   │   ├── api.js            # Axios instance
│   │   └── ...
│   └── assets/               # Images, icons, etc.
├── index.html                # HTML entry point
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── .eslintrc.cjs             # ESLint configuration
├── .env.local                # Environment variables
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## 📚 Dependencies

### Production Dependencies

#### Framework & Routing
- **react**: Modern UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing

#### Styling
- **tailwindcss**: Utility-first CSS framework
- **@tailwindcss/vite**: Vite plugin for Tailwind CSS
- **tailwind-merge**: Merge Tailwind CSS classes

#### State Management & HTTP
- **axios**: Promise-based HTTP client
- **json-server**: Fake REST API for development

#### UI & Animations
- **react-icons**: Icon library with 1000+ icons
- **gsap**: Professional animation library
- **@splinetool/react-spline**: 3D animations and effects
- **classnames**: Utility for conditional CSS classes
- **tailwind**: Utility CSS framework

### Development Dependencies
- **vite**: Ultra-fast build tool and dev server
- **@vitejs/plugin-react**: React plugin for Vite
- **eslint**: Code quality tool
- **@types/react**: TypeScript types for React
- **globals**: Global variables for ESLint

## 🎯 Key Features Explained

### 1. Context API Management
The app uses React Context for state management:
- **UserProvider**: Manages user authentication and profile data
- **CartProvider**: Manages shopping cart items and quantities
- **PurchasedProvider**: Stores order history and purchase information

### 2. Responsive Design with Tailwind CSS
- Mobile-first approach
- Breakpoints for different screen sizes
- Dark mode support (customizable)

### 3. GSAP Animations
- Smooth page transitions
- Product hover effects
- Cart animations
- Loading states

### 4. Axios for API Calls
- Configured to connect with the backend API
- Automatic token management
- Error handling and interceptors

### 5. React Router Navigation
- Client-side routing without page reloads
- Nested routes for complex navigation
- Protected routes for authenticated users

## 📋 Available Routes

```
/                    - Home page with product listing
/products/:id        - Product details page
/cart                - Shopping cart page
/checkout            - Checkout page
/orders              - Order history page
/login               - User login page
/register            - User registration page
/profile             - User profile page
/search              - Search results page
```

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:8000/api`

### Example API Calls
```javascript
// Fetch products
GET /api/products

// Get user profile
GET /api/users/profile

// Add to cart
POST /api/cart/add

// Create order
POST /api/orders
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Connect your GitHub repository
4. Set environment variables in Vercel dashboard
5. Click "Deploy"

### Deploy to Netlify
1. Build the project: `npm run build`
2. Connect your GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is unlicensed. Feel free to use it for your own purposes.

---

## 📞 Support & Contact

For issues or questions:
- Open an issue on [GitHub](https://github.com/basantbansal/Ecommerce_website_frontend)
- Check existing discussions
- Review the project wiki

## 🎨 Screenshots & Features

**Key Pages:**
- 🏠 **Home**: Product catalog with filters
- 🛍️ **Product Details**: Detailed view with reviews
- 🛒 **Cart**: Manage items and see total
- 💳 **Checkout**: Secure order placement
- 📦 **Orders**: Track purchase history
- 👤 **Profile**: User account management

---

**Happy Shopping! 🛍️**

Visit the live demo: https://e-commerce-website-ten-dusky.vercel.app
