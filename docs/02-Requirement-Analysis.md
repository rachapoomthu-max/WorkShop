## 2.1 Functional Requirements

### Customer Functional Requirements

| FR ID | Functional Requirement |
|-------|-------------------------|
| FR-001 | The system shall allow customers to register a new account. |
| FR-002 | The system shall allow customers to log in to the system. |
| FR-003 | The system shall allow customers to log out securely. |
| FR-004 | The system shall allow customers to manage their profile information. |
| FR-005 | The system shall allow customers to browse available products. |
| FR-006 | The system shall allow customers to search products by keyword. |
| FR-007 | The system shall allow customers to filter products by category, brand, and price. |
| FR-008 | The system shall allow customers to view detailed product information. |
| FR-009 | The system shall allow customers to manage their shopping cart. |
| FR-010 | The system shall allow customers to proceed to checkout. |
| FR-011 | The system shall allow customers to select a shipping address. |
| FR-012 | The system shall allow customers to select a payment method. |
| FR-013 | The system shall allow customers to place an order. |
| FR-014 | The system shall allow customers to make payment for an order. |
| FR-015 | The system shall allow customers to view their order history. |
| FR-016 | The system shall allow customers to track order status. |
| FR-017 | The system shall allow customers to view product warranty information. |
| FR-018 | The system shall allow customers to submit warranty claims. |

---

### Admin Functional Requirements

| FR ID | Functional Requirement |
|-------|-------------------------|
| FR-019 | The system shall allow administrators to log in to the administration system. |
| FR-020 | The system shall allow administrators to log out securely. |
| FR-021 | The system shall allow administrators to view the dashboard. |
| FR-022 | The system shall allow administrators to manage products. |
| FR-023 | The system shall allow administrators to manage product categories. |
| FR-024 | The system shall allow administrators to manage customer orders. |
| FR-025 | The system shall allow administrators to manage warranty claims. |
| FR-026 | The system shall allow administrators to view customer information. |

---

### SuperAdmin Functional Requirements

| FR ID | Functional Requirement |
|-------|-------------------------|
| FR-027 | The system shall allow Super Administrators to log in to the administration system. |
| FR-028 | The system shall allow Super Administrators to log out securely. |
| FR-029 | The system shall allow Super Administrators to manage administrator accounts. |
| FR-030 | The system shall allow Super Administrators to manage user roles and permissions. |
| FR-031 | The system shall allow Super Administrators to manage system settings. |
| FR-032 | The system shall allow Super Administrators to view system activity logs. |

---

## 2.2 Non-Functional Requirements

The following non-functional requirements define the quality attributes and operational characteristics of the TechPulse E-Commerce System.


## 2.2.1 Performance

The system shall provide fast and responsive performance to ensure a smooth user experience.

Requirements:

- Product pages should load within **3 seconds** under normal operating conditions.
- API responses should be returned within **2 seconds** for standard requests.
- The system should support multiple concurrent users during peak usage periods.
- Product search and filtering should return results without noticeable delay.

---

## 2.2.2 Security

The system shall protect user information and prevent unauthorized access.

Requirements:

- User passwords must be securely encrypted before storage.
- Only authenticated users can access customer account features.
- Administrative functions shall only be accessible by authorized administrators.
- Input data shall be validated to reduce invalid or malicious requests.

---

## 2.2.3 Availability

The system should remain available whenever users need to access the service.

Requirements:

- The system should be accessible through modern web browsers.
- Database connections should remain stable during normal operation.
- The system should recover gracefully from temporary failures whenever possible.

---

## 2.2.4 Usability

The system shall provide an intuitive and user-friendly interface.

Requirements:

- Navigation should be simple and consistent throughout the website.
- Product information should be presented clearly.
- Important actions should be easy to locate.
- Error messages should clearly explain problems and possible solutions.

---

## 2.2.5 Reliability

The system shall consistently perform its intended functions without unexpected failures.

Requirements:

- Customer orders should be accurately recorded.
- Shopping cart data should remain consistent during user sessions.
- Payment information should be processed correctly.
- Warranty claim information should be stored accurately.

---

## 2.2.6 Maintainability

The system shall be designed to simplify future maintenance and feature enhancements.

Requirements:

- The system should use a modular architecture.
- Source code should be organized into separate frontend and backend components.
- Database design should support future expansion.
- New features should be integrated with minimal impact on existing modules.

---

## 2.2.7 Scalability

The system shall support future growth without requiring significant redesign.

Requirements:

- Additional product categories can be added.
- Additional brands can be added.
- Additional payment methods can be integrated.
- Future features such as Wishlist, Product Comparison, and Promotion System can be implemented.

---

## 2.3 Actor Description

The TechPulse E-Commerce System consists of three primary actors: Customer, Admin, and SuperAdmin. Each actor has different responsibilities and permissions within the system.

| Actor | Description |
|--------|-------------|
| **Customer** | A registered user who purchases computer products through the TechPulse E-Commerce platform. Customers can browse products, search and filter products, manage the shopping cart, place orders, make payments, track orders, view warranty information, and submit warranty claims. |
| **Admin** | A system administrator responsible for managing products, categories, customer orders, warranty claims, customer information, and monitoring the dashboard to ensure smooth business operations. |
| **SuperAdmin** | A senior administrator with full system privileges. In addition to all Admin capabilities, the SuperAdmin can manage administrator accounts, assign user roles and permissions, configure system settings, and view system activity logs. |

---

## 2.4 Use Case List

### Customer Use Cases

| Use Case ID | Use Case Name | Primary Actor | Brief Description |
|-------------|---------------|---------------|-------------------|
| UC-001 | Register | Customer | Create a new customer account. |
| UC-002 | Login | Customer | Authenticate and access the system. |
| UC-003 | Logout | Customer | End the current user session securely. |
| UC-004 | Manage Profile | Customer | View and update personal profile information. |
| UC-005 | Browse Products | Customer | Browse all available products. |
| UC-006 | Search Products | Customer | Search products using keywords. |
| UC-007 | Filter Products | Customer | Filter products by category, brand, or price. |
| UC-008 | View Product Detail | Customer | View detailed information about a selected product. |
| UC-009 | Manage Shopping Cart | Customer | Add, update, or remove products in the shopping cart. |
| UC-010 | Checkout | Customer | Proceed with purchasing products in the shopping cart. |
| UC-011 | Select Shipping Address | Customer | Select a shipping address during checkout. |
| UC-012 | Select Payment Method | Customer | Select a payment method during checkout. |
| UC-013 | Place Order | Customer | Create a new order after confirming checkout. |
| UC-014 | Make Payment | Customer | Complete payment for the created order. |
| UC-015 | View My Orders | Customer | View order history and order details. |
| UC-016 | Track Order | Customer | Track the delivery status of an order. |
| UC-017 | View Warranty | Customer | View warranty information for purchased products. |
| UC-018 | Submit Warranty Claim | Customer | Submit a warranty claim for a purchased product. |

### Admin Use Cases

| Use Case ID | Use Case Name | Primary Actor | Brief Description |
|-------------|---------------|---------------|-------------------|
| UC-019 | Login | Admin | Authenticate and access the administration system. |
| UC-020 | Logout | Admin | End the current administrator session securely. |
| UC-021 | View Dashboard | Admin | View business statistics and system overview. |
| UC-022 | Manage Products | Admin | Add, edit, delete, and maintain product information. |
| UC-023 | Manage Categories | Admin | Create, update, and remove product categories. |
| UC-024 | Manage Orders | Admin | View and update customer order information. |
| UC-025 | Manage Warranty Claims | Admin | Review and process customer warranty claims. |
| UC-026 | View Customer Information | Admin | View customer profiles and purchase history. |

### SuperAdmin Use Cases

| Use Case ID | Use Case Name | Primary Actor | Brief Description |
|-------------|---------------|---------------|-------------------|
| UC-027 | Login | SuperAdmin | Authenticate and access the system with full privileges. |
| UC-028 | Logout | SuperAdmin | End the current SuperAdmin session securely. |
| UC-029 | Manage Admin Accounts | SuperAdmin | Create, update, and manage administrator accounts. |
| UC-030 | Manage Roles | SuperAdmin | Manage user roles and permissions. |
| UC-031 | Manage System Settings | SuperAdmin | Configure system-wide settings. |
| UC-032 | View System Logs | SuperAdmin | View system activity logs for auditing purposes. |

---

## 2.5 Use Case Diagram

![useCase](/Image/UseCase.drawio.png)

---

## 2.6 Use Case Description

# UC-001 Register

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-001 |
| **Use Case Name** | Register |
| **Primary Actor** | Customer |
| **Description** | Allows a new customer to create an account in the TechPulse E-Commerce system. |
| **Preconditions** | The customer does not already have an account. |
| **Trigger** | The customer selects the **Register** menu. |
| **Postconditions** | A new customer account is successfully created in the system. |

## Main Flow

1. Customer opens the registration page.
2. The system displays the registration form.
3. Customer enters the required information.
4. Customer submits the registration form.
5. The system validates the entered information.
6. The system creates a new customer account.
7. The system displays a registration success message.

## Alternative Flow

### 5A. Email already exists

- The system displays an error message.
- Customer enters another email address.

### 5B. Invalid or incomplete information

- The system highlights the invalid fields.
- Customer corrects the information.

---

# UC-002 Login

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-002 |
| **Use Case Name** | Login |
| **Primary Actor** | Customer |
| **Description** | Allows a registered customer to access the system. |
| **Preconditions** | The customer has a registered account. |
| **Trigger** | The customer clicks the **Login** button. |
| **Postconditions** | Customer is successfully authenticated and redirected to the homepage. |

## Main Flow

1. Customer opens the login page.
2. The system displays the login form.
3. Customer enters email and password.
4. Customer submits the login request.
5. The system validates the credentials.
6. The system authenticates the customer.
7. The homepage is displayed.

## Alternative Flow

### 5A. Invalid email or password

- The system displays an authentication error.

---

# UC-003 Logout

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-003 |
| **Use Case Name** | Logout |
| **Primary Actor** | Customer |
| **Description** | Allows the customer to securely exit the system. |
| **Preconditions** | Customer is logged into the system. |
| **Trigger** | Customer selects **Logout**. |
| **Postconditions** | Customer session is terminated. |

## Main Flow

1. Customer clicks Logout.
2. The system invalidates the current session.
3. The system redirects the customer to the homepage.

## Alternative Flow

- None.

---

# UC-004 Manage Profile

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-004 |
| **Use Case Name** | Manage Profile |
| **Primary Actor** | Customer |
| **Description** | Allows the customer to view and update personal profile information. |
| **Preconditions** | Customer is logged into the system. |
| **Trigger** | Customer opens **My Profile**. |
| **Postconditions** | Customer profile information is updated successfully. |

## Main Flow

1. Customer opens My Profile.
2. The system displays profile information.
3. Customer edits profile details.
4. Customer saves the changes.
5. The system validates the updated information.
6. The system updates the profile.
7. The system displays a success message.

## Alternative Flow

### 5A. Invalid information

- The system displays validation errors.
- Customer updates the information again.

---

# UC-005 Browse Products

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-005 |
| **Use Case Name** | Browse Products |
| **Primary Actor** | Customer |
| **Description** | Allows the customer to browse all available products in the system. |
| **Preconditions** | Products exist in the database. |
| **Trigger** | Customer opens the Shop page. |
| **Postconditions** | Product list is displayed. |

## Main Flow

1. Customer opens the Shop page.
2. The system requests product information.
3. The system retrieves product data from the database.
4. The system displays the product catalog.
5. Customer browses available products.

## Alternative Flow

### 3A. No products found

- The system displays a message indicating that no products are available.

---

## UC-006: Search Products

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-006 |
| **Use Case Name** | Search Products |
| **Primary Actor** | Customer |
| **Description** | Allows customers to search for products using keywords. |
| **Preconditions** | Products are available in the system. |
| **Trigger** | Customer enters a keyword in the search bar. |
| **Postconditions** | Matching products are displayed. |

## Main Flow

1. Customer enters a keyword into the search box.
2. Customer submits the search request.
3. The system searches for products matching the keyword.
4. The system retrieves matching products from the database.
5. The system displays the search results.

## Alternative Flow

### 3A. No matching products found

- The system displays a "No products found" message.

---

## UC-007: Filter Products

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-007 |
| **Use Case Name** | Filter Products |
| **Primary Actor** | Customer |
| **Description** | Allows customers to filter products based on categories, brands, or price ranges. |
| **Preconditions** | Products are available in the system. |
| **Trigger** | Customer selects one or more filter options. |
| **Postconditions** | Filtered product list is displayed. |

## Main Flow

1. Customer selects filter options.
2. The system applies the selected filters.
3. The system retrieves filtered products.
4. The filtered products are displayed.

## Alternative Flow

### 3A. No products match the selected filters

- The system displays a message indicating that no matching products were found.

---

## UC-008: View Product Detail

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-008 |
| **Use Case Name** | View Product Detail |
| **Primary Actor** | Customer |
| **Description** | Allows customers to view detailed information about a selected product. |
| **Preconditions** | The selected product exists in the system. |
| **Trigger** | Customer selects a product from the product list. |
| **Postconditions** | Product details are displayed. |

## Main Flow

1. Customer selects a product.
2. The system retrieves product information.
3. The system retrieves product specifications.
4. The system retrieves warranty information.
5. The system displays product details, specifications, stock availability, price, and warranty information.

## Alternative Flow

### 2A. Product no longer exists

- The system displays a "Product not found" message.

---

## UC-009: Manage Shopping Cart

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-009 |
| **Use Case Name** | Manage Shopping Cart |
| **Primary Actor** | Customer |
| **Description** | Allows customers to add, update, or remove products from the shopping cart. |
| **Preconditions** | Customer is logged into the system. |
| **Trigger** | Customer performs an action in the shopping cart. |
| **Postconditions** | Shopping cart information is updated successfully. |

## Main Flow

1. Customer opens the shopping cart.
2. Customer adds, updates, or removes products.
3. The system validates product stock.
4. The system updates the shopping cart.
5. The updated shopping cart is displayed.

## Alternative Flow

### 3A. Product stock is insufficient

- The system displays a stock availability warning.
- The shopping cart remains unchanged.

### 3B. Shopping cart is empty

- The system displays an empty shopping cart message.

---

## UC-010: Checkout

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-010 |
| **Use Case Name** | Checkout |
| **Primary Actor** | Customer |
| **Description** | Allows customers to proceed with the purchase of products in the shopping cart. |
| **Preconditions** | Customer is logged into the system and the shopping cart contains at least one product. |
| **Trigger** | Customer clicks the **Checkout** button. |
| **Postconditions** | A new order is created and the customer proceeds to payment. |

## Main Flow

1. Customer opens the Checkout page.
2. The system displays the shopping cart summary.
3. Customer selects a shipping address.
4. Customer selects a payment method.
5. Customer confirms the order.
6. The system creates a new order.
7. The system redirects the customer to the payment process.

## Alternative Flow

### 2A. Shopping cart is empty

- The system prevents checkout.
- The system displays an empty shopping cart message.

### 3A. Shipping address is not selected

- The system requests the customer to select a shipping address.

### 4A. Payment method is not selected

- The system requests the customer to select a payment method.

---

## UC-011: Select Shipping Address

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-011 |
| **Use Case Name** | Select Shipping Address |
| **Primary Actor** | Customer |
| **Description** | Allows the customer to select a shipping address during the checkout process. This use case is included by **UC-010 Checkout**. |
| **Preconditions** | Customer is performing the Checkout process. |
| **Trigger** | Checkout requires a shipping address. |
| **Postconditions** | The selected shipping address is assigned to the order. |

## Main Flow

1. The system displays the customer's available shipping addresses.
2. Customer selects a shipping address.
3. The system validates the selected address.
4. The selected shipping address is assigned to the current order.
5. Control returns to **UC-010 Checkout**.

## Alternative Flow

### 3A. No shipping address available

- The system prompts the customer to add a new shipping address.

---

## UC-012: Select Payment Method

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-012 |
| **Use Case Name** | Select Payment Method |
| **Primary Actor** | Customer |
| **Description** | Allows the customer to choose a payment method during the checkout process. This use case is included by **UC-010 Checkout**. |
| **Preconditions** | Customer is performing the Checkout process. |
| **Trigger** | Checkout requires a payment method. |
| **Postconditions** | The selected payment method is assigned to the order. |

## Main Flow

1. The system displays available payment methods.
2. Customer selects a payment method.
3. The system validates the selected payment method.
4. The selected payment method is assigned to the order.
5. Control returns to **UC-010 Checkout**.

## Alternative Flow

### 3A. No payment method selected

- The system requests the customer to select a payment method before continuing.

---

## UC-013: Place Order

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-013 |
| **Use Case Name** | Place Order |
| **Primary Actor** | Customer |
| **Description** | Creates a new customer order after the checkout information has been confirmed. This use case is included by **UC-010 Checkout**. |
| **Preconditions** | Shipping address and payment method have been selected. |
| **Trigger** | Customer confirms the checkout process. |
| **Postconditions** | A new order is created with the status **Pending Payment**. |

## Main Flow

1. The system validates the checkout information.
2. The system creates a new order.
3. The system generates the order number.
4. The system saves the order information.
5. The system sets the order status to **Pending Payment**.
6. Control proceeds to **UC-014 Make Payment**.

## Alternative Flow

### 1A. Product is out of stock

- The system cancels the order creation.
- The customer is notified that the selected product is unavailable.

---

## UC-014: Make Payment

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-014 |
| **Use Case Name** | Make Payment |
| **Primary Actor** | Customer |
| **Description** | Allows the customer to complete payment for a newly created order. |
| **Preconditions** | An order has been successfully created. |
| **Trigger** | Customer proceeds to the payment page. |
| **Postconditions** | Payment status is updated and the order status is changed accordingly. |

## Main Flow

1. The system displays the payment summary.
2. Customer confirms the payment.
3. The system processes the payment.
4. The system updates the payment status.
5. The system updates the order status.
6. The system displays a payment success message.

## Alternative Flow

### 3A. Payment failed

- The system marks the payment as failed.
- The customer can retry the payment.

### 3B. Customer cancels the payment

- The order remains in **Pending Payment** status.

---

## UC-015: View My Orders

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-015 |
| **Use Case Name** | View My Orders |
| **Primary Actor** | Customer |
| **Description** | Allows customers to view their order history and current order information. |
| **Preconditions** | Customer is logged into the system. |
| **Trigger** | Customer opens the **My Orders** page. |
| **Postconditions** | Customer's order history is displayed. |

## Main Flow

1. Customer opens the My Orders page.
2. The system retrieves all customer orders.
3. The system displays the order history.
4. Customer selects an order to view more details.

## Alternative Flow

### 2A. No orders found

- The system displays a message indicating that no orders are available.

---

## UC-016: Track Order

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-016 |
| **Use Case Name** | Track Order |
| **Primary Actor** | Customer |
| **Description** | Allows the customer to track the current status of an order. This use case extends **UC-015 View My Orders**. |
| **Preconditions** | Customer is logged in and has at least one order. |
| **Trigger** | Customer selects an order from the **My Orders** page. |
| **Postconditions** | The current order status is displayed. |

## Main Flow

1. Customer selects an order from the order history.
2. The system retrieves the latest order status.
3. The system displays the current order status and tracking information.
4. Customer reviews the delivery progress.
5. Control returns to **UC-015 View My Orders**.

## Alternative Flow

### 2A. Order not found

- The system displays an error message.

---

## UC-017: View Warranty

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-017 |
| **Use Case Name** | View Warranty |
| **Primary Actor** | Customer |
| **Description** | Allows the customer to view warranty information for a purchased product. This use case extends **UC-015 View My Orders**. |
| **Preconditions** | Customer is logged in and has purchased products with warranty information. |
| **Trigger** | Customer selects **View Warranty** from an order. |
| **Postconditions** | Warranty information is displayed. |

## Main Flow

1. Customer selects a purchased product.
2. The system retrieves warranty information.
3. The system displays the warranty provider, warranty period, and warranty status.
4. Customer reviews the warranty details.

## Alternative Flow

### 2A. Warranty information is unavailable

- The system displays a message indicating that no warranty information is available.

---

## UC-018: Submit Warranty Claim

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-018 |
| **Use Case Name** | Submit Warranty Claim |
| **Primary Actor** | Customer |
| **Description** | Allows the customer to submit a warranty claim for a purchased product. This use case extends **UC-017 View Warranty**. |
| **Preconditions** | Customer is viewing warranty information and the warranty is still valid. |
| **Trigger** | Customer clicks **Submit Warranty Claim**. |
| **Postconditions** | A warranty claim is successfully submitted and stored in the system. |

## Main Flow

1. Customer selects **Submit Warranty Claim**.
2. The system displays the warranty claim form.
3. Customer enters claim details.
4. Customer submits the warranty claim.
5. The system validates the submitted information.
6. The system creates a new warranty claim.
7. The system displays a submission success message.

## Alternative Flow

### 5A. Warranty has expired

- The system rejects the warranty claim.
- The system displays a warranty expired message.

### 5B. Required information is incomplete

- The system requests the customer to complete the required information.

---

# Admin Use Cases

---

## UC-019: Login

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-019 |
| **Use Case Name** | Login |
| **Primary Actor** | Admin |
| **Description** | Allows an administrator to access the administration system. |
| **Preconditions** | The administrator has a valid account. |
| **Trigger** | Admin selects the **Login** menu. |
| **Postconditions** | Admin is successfully authenticated and redirected to the Dashboard. |

## Main Flow

1. Admin opens the login page.
2. The system displays the login form.
3. Admin enters email and password.
4. Admin submits the login request.
5. The system validates the credentials.
6. The system authenticates the administrator.
7. The Dashboard page is displayed.

## Alternative Flow

### 5A. Invalid email or password

- The system displays an authentication error message.

---

## UC-020: Logout

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-020 |
| **Use Case Name** | Logout |
| **Primary Actor** | Admin |
| **Description** | Allows an administrator to securely exit the administration system. |
| **Preconditions** | Admin is logged into the system. |
| **Trigger** | Admin clicks **Logout**. |
| **Postconditions** | Admin session is terminated successfully. |

## Main Flow

1. Admin clicks Logout.
2. The system invalidates the current session.
3. The system redirects Admin to the Login page.

## Alternative Flow

- None.

---

## UC-021: View Dashboard

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-021 |
| **Use Case Name** | View Dashboard |
| **Primary Actor** | Admin |
| **Description** | Allows an administrator to view a summary of the system, including products, orders, customers, and sales information. |
| **Preconditions** | Admin is logged into the system. |
| **Trigger** | Admin opens the Dashboard. |
| **Postconditions** | Dashboard information is displayed. |

## Main Flow

1. Admin opens the Dashboard.
2. The system retrieves dashboard statistics.
3. The system retrieves recent orders and product information.
4. The system displays dashboard information.

## Alternative Flow

### 2A. Dashboard data is unavailable

- The system displays an error message.

---

## UC-022: Manage Products

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-022 |
| **Use Case Name** | Manage Products |
| **Primary Actor** | Admin |
| **Description** | Allows an administrator to manage product information including adding, editing, deleting products, and uploading product images. |
| **Preconditions** | Admin is logged into the system. |
| **Trigger** | Admin opens the Product Management page. |
| **Postconditions** | Product information is successfully updated. |

## Main Flow

1. Admin opens Product Management.
2. The system displays the product list.
3. Admin selects Add, Edit, or Delete.
4. Admin enters or updates product information.
5. Admin uploads product images if required.
6. The system validates the product information.
7. The system saves the changes.
8. The updated product list is displayed.

## Alternative Flow

### 6A. Invalid product information

- The system displays validation errors.

### 6B. Image upload failed

- The system requests the administrator to upload the image again.

---

## UC-023: Manage Categories

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-023 |
| **Use Case Name** | Manage Categories |
| **Primary Actor** | Admin |
| **Description** | Allows an administrator to create, update, and delete product categories. |
| **Preconditions** | Admin is logged into the system. |
| **Trigger** | Admin opens Category Management. |
| **Postconditions** | Category information is successfully updated. |

## Main Flow

1. Admin opens Category Management.
2. The system displays all categories.
3. Admin adds, edits, or deletes a category.
4. The system validates the information.
5. The system saves the changes.
6. The updated category list is displayed.

## Alternative Flow

### 4A. Category name already exists

- The system displays an error message.

---

## UC-024: Manage Orders

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-024 |
| **Use Case Name** | Manage Orders |
| **Primary Actor** | Admin |
| **Description** | Allows an administrator to view customer orders and update order status. |
| **Preconditions** | Admin is logged into the system. |
| **Trigger** | Admin opens Order Management. |
| **Postconditions** | Order information is successfully updated. |

## Main Flow

1. Admin opens Order Management.
2. The system displays customer orders.
3. Admin selects an order.
4. The system displays order details.
5. Admin updates the order status.
6. The system saves the updated status.
7. The updated order information is displayed.

## Alternative Flow

### 2A. No orders found

- The system displays a message indicating that no orders are available.

---

## UC-025: Manage Warranty Claims

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-025 |
| **Use Case Name** | Manage Warranty Claims |
| **Primary Actor** | Admin |
| **Description** | Allows an administrator to review and update customer warranty claims. |
| **Preconditions** | Admin is logged into the system. |
| **Trigger** | Admin opens Warranty Claim Management. |
| **Postconditions** | Warranty claim information is successfully updated. |

## Main Flow

1. Admin opens Warranty Claim Management.
2. The system displays warranty claim requests.
3. Admin selects a warranty claim.
4. The system displays claim details.
5. Admin reviews the claim.
6. Admin updates the claim status.
7. The system saves the updated status.
8. The updated claim information is displayed.

## Alternative Flow

### 2A. No warranty claims found

- The system displays a message indicating that no warranty claims are available.

---

## UC-026: View Customer Information

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-026 |
| **Use Case Name** | View Customer Information |
| **Primary Actor** | Admin |
| **Description** | Allows an administrator to view customer profile information and purchase history. |
| **Preconditions** | Admin is logged into the system. |
| **Trigger** | Admin selects a customer account. |
| **Postconditions** | Customer information is displayed. |

## Main Flow

1. Admin opens Customer Management.
2. The system displays the customer list.
3. Admin selects a customer.
4. The system retrieves customer information.
5. The system displays the customer's profile and order history.

## Alternative Flow

### 4A. Customer information not found

- The system displays an error message.

---

# SuperAdmin Use Cases

---

## UC-027: Login

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-027 |
| **Use Case Name** | Login |
| **Primary Actor** | SuperAdmin |
| **Description** | Allows the Super Administrator to access the administration system with full privileges. |
| **Preconditions** | The Super Administrator has a valid account. |
| **Trigger** | SuperAdmin selects the **Login** menu. |
| **Postconditions** | SuperAdmin is successfully authenticated and redirected to the Dashboard. |

## Main Flow

1. SuperAdmin opens the login page.
2. The system displays the login form.
3. SuperAdmin enters email and password.
4. SuperAdmin submits the login request.
5. The system validates the credentials.
6. The system authenticates the SuperAdmin.
7. The Dashboard is displayed.

## Alternative Flow

### 5A. Invalid email or password

- The system displays an authentication error message.

---

## UC-028: Logout

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-028 |
| **Use Case Name** | Logout |
| **Primary Actor** | SuperAdmin |
| **Description** | Allows the Super Administrator to securely exit the administration system. |
| **Preconditions** | SuperAdmin is logged into the system. |
| **Trigger** | SuperAdmin clicks **Logout**. |
| **Postconditions** | SuperAdmin session is terminated successfully. |

## Main Flow

1. SuperAdmin clicks Logout.
2. The system invalidates the current session.
3. The system redirects SuperAdmin to the Login page.

## Alternative Flow

- None.

---

## UC-029: Manage Admin Accounts

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-029 |
| **Use Case Name** | Manage Admin Accounts |
| **Primary Actor** | SuperAdmin |
| **Description** | Allows the Super Administrator to create, update, delete, and manage administrator accounts. |
| **Preconditions** | SuperAdmin is logged into the system. |
| **Trigger** | SuperAdmin opens the Admin Management page. |
| **Postconditions** | Administrator account information is successfully updated. |

## Main Flow

1. SuperAdmin opens Admin Management.
2. The system displays all administrator accounts.
3. SuperAdmin selects Add, Edit, or Delete.
4. SuperAdmin enters or updates administrator information.
5. The system validates the information.
6. The system saves the changes.
7. The updated administrator list is displayed.

## Alternative Flow

### 5A. Administrator email already exists

- The system displays an error message.

### 5B. Invalid administrator information

- The system displays validation errors.

---

## UC-030: Manage Roles

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-030 |
| **Use Case Name** | Manage Roles |
| **Primary Actor** | SuperAdmin |
| **Description** | Allows the Super Administrator to assign, modify, and manage user roles and permissions. |
| **Preconditions** | SuperAdmin is logged into the system. |
| **Trigger** | SuperAdmin opens the Role Management page. |
| **Postconditions** | Role information is successfully updated. |

## Main Flow

1. SuperAdmin opens Role Management.
2. The system displays all available roles.
3. SuperAdmin selects a role.
4. SuperAdmin updates permissions.
5. The system validates the changes.
6. The system saves the updated role information.
7. The updated role list is displayed.

## Alternative Flow

### 5A. Invalid permission configuration

- The system rejects the update and displays an error message.

---

## UC-031: Manage System Settings

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-031 |
| **Use Case Name** | Manage System Settings |
| **Primary Actor** | SuperAdmin |
| **Description** | Allows the Super Administrator to configure system-wide settings and application preferences. |
| **Preconditions** | SuperAdmin is logged into the system. |
| **Trigger** | SuperAdmin opens the System Settings page. |
| **Postconditions** | System configuration is successfully updated. |

## Main Flow

1. SuperAdmin opens System Settings.
2. The system displays current configuration.
3. SuperAdmin modifies the configuration.
4. The system validates the configuration.
5. The system saves the updated settings.
6. The system displays a success message.

## Alternative Flow

### 4A. Invalid configuration

- The system displays validation errors.

---

## UC-032: View System Logs

| Field | Description |
|--------|-------------|
| **Use Case ID** | UC-032 |
| **Use Case Name** | View System Logs |
| **Primary Actor** | SuperAdmin |
| **Description** | Allows the Super Administrator to view system activity logs for monitoring and auditing purposes. |
| **Preconditions** | SuperAdmin is logged into the system. |
| **Trigger** | SuperAdmin opens the System Logs page. |
| **Postconditions** | System logs are displayed. |

## Main Flow

1. SuperAdmin opens System Logs.
2. The system retrieves activity logs.
3. The system displays the log list.
4. SuperAdmin reviews the activity records.

## Alternative Flow

### 2A. No log records available

- The system displays a message indicating that no log records are available.