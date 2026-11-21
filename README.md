# ShopVerse - Modern E-Commerce Web Application

A full-featured, responsive online shopping platform designed using **HTML5**, **CSS3**, **JavaScript (ES6+)**, and **XML**. Product data is stored in and parsed dynamically from a structured XML file using the native JavaScript `DOMParser` and XML DOM API.

---

## 🌟 Key Features & Pages

The application consists of all 7 required core pages:

1. **Home Page (`index.html`)**
   - Modern hero banner with call-to-actions, promotional ribbons, and trust badges.
   - Featured categories showcase (Electronics, Accessories, Fashion, Home & Living).
   - Trending & featured products dynamically loaded from `data/products.xml`.
   - Limited-time promotional banner with an interactive live countdown timer.
   - Newsletter subscription form and multi-column footer.

2. **Products Page (`products.html`)**
   - Loads products directly from `data/products.xml` using JavaScript `DOMParser` and XML DOM methods (`getElementsByTagName`, `getAttribute`, etc.).
   - Interactive category filtering with real-time product count badges.
   - Interactive price range slider with live min/max indicator.
   - In-stock availability filter toggle.
   - Live search filter by product name, category, and tags.
   - Sorting options: Featured first, Price low-to-high, Price high-to-low, Highest rated, and Name A-Z.
   - Product cards featuring images, badges, star ratings, review counts, discount percentages, and quick "Add to Cart" / "View Details" buttons.
   - Responsive empty state with a "Reset All Filters" action.

3. **Product Details Page (`product-details.html`)**
   - Retrieves product ID dynamically from URL query parameters (e.g. `?id=prod-101`).
   - Detailed product view with category breadcrumbs, image showcase, stock availability pill, and savings calculation.
   - Full technical specifications table dynamically extracted from `<specifications><spec>` XML nodes.
   - Product tags from `<tags><tag>` XML elements.
   - Interactive quantity stepper (`+` / `-`).
   - "Add to Cart" and "Buy Now" (direct to checkout) buttons.
   - Customer review breakdown and verified customer reviews list.
   - Related products carousel/grid based on the active product's category.

4. **Shopping Cart Page (`cart.html`)**
   - Full cart management persisted via browser `localStorage`.
   - Item line items with image thumbnail, category, title, unit price, quantity increment/decrement, and item subtotal.
   - Remove individual items and "Clear Entire Cart" action.
   - Dynamic Free Shipping Progress Bar (e.g., Free Shipping on orders over $50).
   - Order summary calculations: Subtotal, Shipping, Tax (8%), and Promo Discounts.
   - Promo coupon code validator supporting codes: `SUMMER20` (20% off), `WELCOME15` (15% off), and `SAVE10` (10% off).

5. **Checkout Page (`checkout.html`)**
   - 2-Column responsive checkout workflow:
     - **Step 1:** Customer Contact Details (auto-fills if user is signed in).
     - **Step 2:** Shipping & Delivery Address form with input validations.
     - **Step 3:** Payment Method selection:
       - Credit / Debit Card (with card number formatting, expiration date, and CVV checks).
       - UPI / QR Pay (with VPA ID validation).
       - Cash on Delivery (COD).
   - Order review summary with live coupon discount application.
   - Order placement logic that generates an Order ID (e.g. `SV-2026-98124`), delivery date estimate, and logs the order to `localStorage`.
   - Order confirmation modal with options to Print Invoice or continue shopping.

6. **Login / Register Page (`login.html`)**
   - Tabbed interface switching between **Sign In** and **Create Account**.
   - Demo credentials banner with a 1-click "Auto Fill" button (`demo@shopverse.com` / `password123`).
   - Sign-in authentication with error feedback.
   - User registration with validation (email formatting, password length, and confirmation matching).
   - Session management via `localStorage` that updates the navigation bar with user avatar, name, and a dropdown menu with logout functionality.
   - Active user profile view if already signed in.

7. **Contact Page (`contact.html`)**
   - Information cards with address, 24/7 phone support, and customer care email.
   - Interactive customer contact form with inquiry subject categorization and instant feedback toast.
   - Interactive FAQ accordion with collapsible questions and answers explaining XML data loading, shipping policies, returns, and payment methods.

---

## 🗂️ Project Structure

```text
lab12/
├── index.html              # Home page
├── products.html           # Products catalog (loaded from XML)
├── product-details.html    # Product detail page
├── cart.html               # Shopping cart
├── checkout.html           # Multi-step checkout & payment
├── login.html              # Sign in / Account registration
├── contact.html            # Contact support & FAQs
├── css/
│   └── style.css           # Modern unified design system
├── js/
│   ├── xml-loader.js       # XML fetching, DOMParser, and fallback
│   ├── cart.js             # Cart state, quantities, badges & toasts
│   ├── auth.js             # User authentication & session handling
│   └── main.js             # Global utilities, navigation & search
├── data/
│   └── products.xml        # Structured XML catalog
└── README.md               # Project documentation
```

---

## 📄 XML Catalog Structure

The products are structured in `data/products.xml` following this schema:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<catalog>
    <product id="prod-101">
        <name>Aura Pro Wireless Noise-Cancelling Headphones</name>
        <category>Electronics</category>
        <price>249.99</price>
        <originalPrice>329.99</originalPrice>
        <rating>4.8</rating>
        <reviewsCount>342</reviewsCount>
        <featured>true</featured>
        <inStock>true</inStock>
        <stockCount>28</stockCount>
        <image>https://...</image>
        <thumbnail>https://...</thumbnail>
        <shortDescription>...</shortDescription>
        <description>...</description>
        <specifications>
            <spec name="Connectivity">Bluetooth 5.3, 3.5mm Aux</spec>
            <spec name="Battery Life">Up to 40 hours (ANC on)</spec>
            ...
        </specifications>
        <tags>
            <tag>wireless</tag>
            <tag>audio</tag>
        </tags>
    </product>
</catalog>
```

---

## 🚀 How to Run Locally

You can run this project in two ways:

### Option 1: Direct File Access
Simply double-click or open any HTML file (such as `index.html`) directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
> *Note:* The built-in XML loader automatically handles both standard HTTP servers and local `file://` protocols with `DOMParser`.

### Option 2: Local HTTP Server
Using Python (built-in):
```bash
python3 -m http.server 8000
```
Then navigate to:
```text
http://localhost:8000
```

---

## 🔑 Demo Credentials & Vouchers

- **Demo Account:**
  - **Email:** `demo@shopverse.com`
  - **Password:** `password123`
- **Promo Discount Codes (Enter on Cart page):**
  - `SUMMER20` - 20% discount on entire cart
  - `WELCOME15` - 15% discount on entire cart
  - `SAVE10` - 10% discount on entire cart
