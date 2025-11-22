# Lao Perfume E-commerce Website

## Project Overview

Lao Perfume is an e-commerce website specializing in luxury perfumes from brands like Dorall Collection and Creation Lamis. The website showcases a wide variety of perfumes for men, women, and unisex categories.

## Tech Stack

- React.js
- Vite (Build Tool)
- TailwindCSS (Styling)
- ES6+ JavaScript

## Project Structure

```
project/
├── public/               # Public assets
├── src/                 # Source code
│   ├── assets/         # Images and media files
│   ├── components/     # Reusable React components
│   │   ├── Footer.jsx
│   │   ├── InfoCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── ScrollToHash.jsx
│   ├── data/          # Data files
│   │   └── products.js # Product catalog
│   ├── layouts/       # Layout components
│   │   └── MainLayout.jsx
│   ├── pages/         # Page components
│   │   ├── AboutUs.jsx
│   │   ├── Checkout.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   └── [Other pages]
│   ├── App.jsx        # Main App component
│   ├── App.css        # App-specific styles
│   ├── index.css      # Global styles
│   └── main.jsx       # Entry point
```

## Features

### Product Catalog

- Total of 79 products
- Categories: Men, Women, Unisex
- Brands:
  - Dorall Collection
  - Creation Lamis

### Product Information

Each product includes:

- Unique ID
- Name
- Price
- Category
- Brand
- Image
- Rating (out of 5)
- Number of reviews
- Total sales
- Sale status and old price (if applicable)

### Pages

1. **Home** - Main landing page
2. **Products** - Product catalog/listing
3. **ProductDetail** - Individual product view
4. **Checkout** - Shopping cart and checkout process
5. **AboutUs** - Company information
6. **Contact** - Contact information
7. **Additional Pages**:
   - Privacy Policy
   - Terms & Conditions
   - FAQ
   - Delivery Information
   - Return Policy
   - News
   - Promotions
   - Cookies Policy

### Components

1. **Navbar** - Main navigation
2. **Footer** - Site footer with links
3. **ProductCard** - Reusable product display component
4. **InfoCard** - Information display component
5. **ScrollToHash** - Navigation utility component

## Product Categories

### Men's Fragrances

- Various collections from Dorall Collection and Creation Lamis
- Price range: 150,000 - 500,000
- Multiple variants and editions available

### Women's Fragrances

- Extensive range of women's perfumes
- Premium and casual collections
- Various sizes and concentrations

### Unisex Fragrances

- Select collection of unisex fragrances
- Special editions and limited releases

## File Structure Details

### Main Configuration Files

- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - TailwindCSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

### Data Management

- Product data is centralized in `products.js`
- Images are imported and managed through the assets directory
- Structured data format for consistent product information

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

### Build

Create a production build:

```bash
npm run build
```

## Additional Information

- All product images are stored in WebP format for optimal performance
- Pricing is consistent across product categories
- Rating system is implemented on a 5-star scale
- Sales tracking and review system integrated
