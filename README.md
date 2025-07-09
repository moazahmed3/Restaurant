# 🍽️ Restaurant - Smart Restaurant Website

> A complete restaurant website with menu, cart, authentication, and checkout functionalities.  
> Built with HTML, CSS, Bootstrap, JavaScript – no frameworks, just clean code!
<p align="center">
  <img src="./img/Screenshot 2025-07-09 045128" alt="Restoran Screenshot" width="100%" />
</p>


🔗 **Live Demo:** [Restoran by Moaz Ahmed](https://moazahmed3.github.io/Restaurant/)
  
---

## 📌 Project Features

### 🖥️ General
- Responsive layout for all screen sizes (Desktop, Tablet, Mobile)
- Smooth animations and interactions using **WOW.js** and **jQuery**
- Elegant UI design based on Bootstrap 5

### 🧑‍🍳 Home Page
- Hero section with attractive call-to-action
- Menu section with dynamic meal loading (Pizza / Fish / Beef)
- Clicking a meal type fetches data from an external API
- Ability to add items to cart using the ➕ icon

### 🛒 Cart Page
- Stores cart data in **LocalStorage**
- View all added items with:
  - Thumbnail
  - Title
  - Price
  - Delete option
- Total amount calculated dynamically
- Clear cart button
- "Proceed to Checkout" link

### 🔐 Authentication
- Fake login system using localStorage
- User **must log in** before adding items to the cart
- Logout icon in navbar to clear session

### 💳 Checkout Page
- Form includes:
  - Full name
  - Phone number
  - Address
  - Payment method (Cash, PayPal, Vodafone Cash)
- Validates all fields before confirmation
- Displays alert and redirects user to homepage
- Empties cart after order is placed

---

## 🧰 Technologies Used

| Category       | Tools                              |
|----------------|-------------------------------------|
| HTML/CSS       | HTML5, CSS3, Bootstrap 5            |
| JS Libraries   | jQuery, WOW.js, CounterUp, OwlCarousel |
| APIs           | Forkify API (for meal data)         |
| Storage        | localStorage                        |

---

## 🛡️ Authentication Flow

- If user clicks ➕ without being logged in → redirect to `login.html`
- When logged in:
  - Their session is saved in localStorage
  - Can add and remove items from cart
- Logout button clears session

---

## 💡 Future Improvements

- Integrate real payment gateway (e.g., Stripe, PayMob)
- Backend integration (Node.js or Firebase)
- Better meal categorization and filtering
- User registration and persistent orders

---

## 📂 Folder Structure (Simplified)

