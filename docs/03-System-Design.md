## 3.1 System Architecture

The system architecture illustrates the overall structure of the TechPulse E-Commerce System. The application follows a three-tier architecture consisting of the Presentation Layer, Application Layer, and Data Layer. Customers, administrators, and super administrators interact with the system through a web browser. The frontend communicates with the backend via RESTful APIs, while the backend processes business logic and manages data stored in the MySQL database. Product images are stored separately in the local upload storage and referenced by the database.

```mermaid
flowchart TB

    subgraph Users
        Customer["Customer"]
        Admin["Store Administrator"]
        SuperAdmin["System Administrator"]
    end

    subgraph Presentation_Layer["Presentation Layer"]
        React["React Web Application<br/>React Router"]
    end

    subgraph Application_Layer["Application Layer"]
        Express["Node.js + Express REST API"]

        Auth["Authentication"]
        Product["Product Management"]
        Search["Search Module"]
        Cart["Shopping Cart"]
        Order["Order Management"]
        Payment["Mock Payment"]
        Warranty["Warranty Management"]
        AdminModule["Administration Module"]
    end

    subgraph Data_Layer["Data Layer"]
        Upload["Local Image Storage"]
        DB["MySQL Database"]
    end

    Customer --> React
    Admin --> React
    SuperAdmin --> React

    React --> Express

    Express --> Auth
    Express --> Product
    Express --> Search
    Express --> Cart
    Express --> Order
    Express --> Payment
    Express --> Warranty
    Express --> AdminModule

    Product --> Upload

    Auth --> DB
    Product --> DB
    Search --> DB
    Cart --> DB
    Order --> DB
    Payment --> DB
    Warranty --> DB
    AdminModule --> DB
```

**Figure 3.1:** System Architecture of the TechPulse E-Commerce System.

### Description

The TechPulse E-Commerce System adopts a three-tier architecture consisting of the following layers:

- **Presentation Layer** provides the user interface developed using React.js. Customers, Store Administrators, and System Administrators access the system through a web browser.

- **Application Layer** is implemented using Node.js and Express.js. It contains the core business logic, including authentication, product management, product search, shopping cart, order processing, payment processing, warranty management, and administration functions.

- **Data Layer** consists of the MySQL database and local image storage. The MySQL database stores application data such as users, products, categories, orders, payments, and warranty claims, while uploaded product images are stored in the local upload directory and referenced by the database.

---

## 3.1 Class Diagram

```mermaid
classDiagram

%% =====================================================
%% USER MANAGEMENT
%% =====================================================

class User{
+userId : int
+firstName : string
+lastName : string
+email : string
+passwordHash : string
+phone : string
+status : string

+register()
+login()
+logout()
+updateProfile()
}

class Customer{
+browseProducts()
+searchProducts()
+filterProducts()
+viewProductDetail()

+manageShoppingCart()

+checkout()

+viewOrders()

+viewWarranty()

+submitWarrantyClaim()
}

class Admin{
+manageProducts()
+manageCategories()
+manageOrders()
+viewCustomerInformation()
+manageWarrantyClaims()
+viewDashboard()
}

class SuperAdmin{
+manageAdminAccounts()
+manageRoles()
+manageSystemSettings()
+viewSystemLogs()
}

User <|-- Customer
User <|-- Admin
Admin <|-- SuperAdmin

%% =====================================================
%% ROLE
%% =====================================================

class Role{
+roleId : int
+roleName : string
}

User "*" --> "1" Role

%% =====================================================
%% ADDRESS
%% =====================================================

class Address{
+addressId : int
+recipientName : string
+phone : string
+addressLine : string
+district : string
+province : string
+postalCode : string
+isDefault : boolean
}

User "1" -- "*" Address

%% =====================================================
%% PRODUCT
%% =====================================================

class Product{
+productId : int
+sku : string
+name : string
+description : string
+price : decimal
+stock : int
+status : string
+imageURL : string
}

class Category{
+categoryId : int
+categoryName : string
}

class Brand{
+brandId : int
+brandName : string
}

Category "1" --> "*" Product
Brand "1" --> "*" Product

%% =====================================================
%% SHOPPING CART
%% =====================================================

class ShoppingCart{

+cartId : int

+totalPrice : decimal

+addItem()

+updateItem()

+removeItem()

+clearCart()

}

class CartItem{

+quantity : int

+subtotal : decimal

}

Customer "1" *-- "1" ShoppingCart

ShoppingCart "1" *-- "*" CartItem

CartItem "*" --> "1" Product

%% =====================================================
%% ORDER
%% =====================================================

class Order{

+orderId : int

+orderDate : Date

+status : string

+totalAmount : decimal

+shippingName : string

+shippingPhone : string

+shippingAddress : string

+placeOrder()

+trackOrder()

}

class OrderItem{

+quantity : int

+price : decimal

}

Customer "1" --> "*" Order

Order "1" *-- "*" OrderItem

OrderItem "*" --> "1" Product

%% =====================================================
%% PAYMENT
%% =====================================================

class Payment{

+paymentId : int

+paymentMethod : string

+amount : decimal

+paymentStatus : string

+paymentDate : Date

+transactionId : string

+processPayment()

}

Order "1" --> "1" Payment

%% =====================================================
%% WARRANTY
%% =====================================================

class Warranty{

+warrantyId : int

+provider : string

+serialNumber : string

+warrantyEndDate : Date

+status : string

}

class WarrantyClaim{

+claimId : int

+claimDate : Date

+description : string

+claimStatus : string

+adminRemark : string

+submittedAt : Date

+completedAt : Date

}

OrderItem "1" --> "0..1" Warranty

Warranty "1" --> "*" WarrantyClaim

Customer "1" --> "*" WarrantyClaim

%% =====================================================
%% DASHBOARD
%% =====================================================

class DashboardService{

+viewSales()

+viewRevenue()

+viewOrders()

+viewCustomers()

+viewProducts()

+viewWarrantyClaims()

}

Admin ..> DashboardService

%% =================================
%% ROLE
%% =================================

class Role{

+roleId : int
+roleName : string

}

SuperAdmin --> Role

```

---

## 3.3 Sequence Diagram

### 3.3.1 Customer Purchase Flow

The Customer Purchase Flow sequence diagram illustrates the complete purchasing process in the TechPulse E-Commerce System. The workflow begins when a customer browses and selects a product, adds it to the shopping cart, and proceeds to the checkout process. The customer then provides the shipping address, selects a payment method, and places the order. The system validates the order, processes the payment, updates the order status, and clears the shopping cart after a successful transaction. If the payment fails, the customer is notified and may retry the payment process.

```mermaid
sequenceDiagram

autonumber

actor Customer

participant Frontend as React Frontend
participant ProductController
participant CartController
participant AddressController
participant OrderController
participant PaymentController
participant DB as MySQL Database

%% ==========================
%% Browse Products
%% ==========================

Customer->>Frontend: Browse Products

activate Frontend

Frontend->>ProductController: GET /products

activate ProductController

ProductController->>DB: Query Products

activate DB

DB-->>ProductController: Product List

deactivate DB

ProductController-->>Frontend: Return Products

deactivate ProductController

Frontend-->>Customer: Display Product List

deactivate Frontend

%% ==========================
%% View Product Detail
%% ==========================

Customer->>Frontend: Select Product

activate Frontend

Frontend->>ProductController: GET /products/{id}

activate ProductController

ProductController->>DB: Query Product Detail

activate DB

DB-->>ProductController: Product Detail

deactivate DB

ProductController-->>Frontend: Return Product Detail

deactivate ProductController

Frontend-->>Customer: Display Product Detail

deactivate Frontend

%% ==========================
%% Add to Cart
%% ==========================

Customer->>Frontend: Add to Cart

activate Frontend

Frontend->>CartController: POST /cart

activate CartController

CartController->>DB: Save Cart Item

activate DB

DB-->>CartController: Cart Updated

deactivate DB

CartController-->>Frontend: Cart Updated

deactivate CartController

Frontend-->>Customer: Display Shopping Cart

deactivate Frontend

%% ==========================
%% Checkout
%% ==========================

Customer->>Frontend: Checkout

activate Frontend

Frontend->>AddressController: GET /addresses

activate AddressController

AddressController->>DB: Retrieve Customer Addresses

activate DB

DB-->>AddressController: Address List

deactivate DB

AddressController-->>Frontend: Return Address List

deactivate AddressController

Frontend-->>Customer: Display Shipping Addresses

Customer->>Frontend: Select Shipping Address

Frontend->>OrderController: Submit addressId

activate OrderController

OrderController-->>Frontend: Address Valid

Frontend->>OrderController: Select Payment Method

OrderController-->>Frontend: Payment Method Accepted

deactivate OrderController

%% ==========================
%% Place Order
%% ==========================

Customer->>Frontend: Place Order

Frontend->>OrderController: Create Order

activate OrderController

OrderController->>DB: Insert Order

activate DB

DB-->>OrderController: Order ID

deactivate DB

loop For each Cart Item

OrderController->>DB: Insert Order Item

DB-->>OrderController: Success

end

%% ==========================
%% Payment
%% ==========================

OrderController->>PaymentController: Process Payment

activate PaymentController

PaymentController->>DB: Update Payment Status

activate DB

DB-->>PaymentController: Payment Completed

deactivate DB

alt Payment Success

PaymentController-->>OrderController: Payment Success

OrderController->>DB: Update Order Status

DB-->>OrderController: Paid

OrderController->>DB: Clear Shopping Cart

DB-->>OrderController: Cart Cleared

OrderController-->>Frontend: Order Completed

Frontend-->>Customer: Display Order Success

else Payment Failed

PaymentController-->>OrderController: Payment Failed

OrderController-->>Frontend: Display Payment Failed

Frontend-->>Customer: Retry Payment

end

deactivate PaymentController

deactivate OrderController

deactivate Frontend

```

---

### 3.3.2 Warranty Claim Flow (Customer)

The Warranty Claim Flow sequence diagram illustrates the process of submitting a warranty claim for a purchased product. The customer first views their order history and warranty information, then selects an eligible product and submits a warranty claim. The system validates the request, stores the warranty claim in the database, and returns a confirmation message indicating that the claim has been successfully submitted for administrator review.

```mermaid
sequenceDiagram

autonumber

actor Customer

participant Frontend as React Frontend
participant WarrantyController
participant DB as MySQL Database

%% ======================================
%% View Order History
%% ======================================

Customer->>Frontend: View My Orders

activate Frontend

Frontend->>WarrantyController: GET /orders

activate WarrantyController

WarrantyController->>DB: Retrieve Customer Orders

activate DB

DB-->>WarrantyController: Order List

deactivate DB

WarrantyController-->>Frontend: Return Order List

Frontend-->>Customer: Display My Orders

deactivate WarrantyController

deactivate Frontend

%% ======================================
%% View Warranty
%% ======================================

Customer->>Frontend: View Warranty Information

activate Frontend

Frontend->>WarrantyController: GET /warranty/{orderId}

activate WarrantyController

WarrantyController->>DB: Retrieve Warranty Information

activate DB

DB-->>WarrantyController: Warranty Details

deactivate DB

WarrantyController-->>Frontend: Return Warranty Information

Frontend-->>Customer: Display Warranty Details

deactivate WarrantyController

deactivate Frontend

%% ======================================
%% Submit Warranty Claim
%% ======================================

Customer->>Frontend: Submit Warranty Claim

activate Frontend

Frontend->>WarrantyController: POST /warranty/claim

activate WarrantyController

WarrantyController->>DB: Save Warranty Claim

activate DB

DB-->>WarrantyController: Claim Created

deactivate DB

WarrantyController-->>Frontend: Warranty Claim Submitted

Frontend-->>Customer: Display Claim Success

deactivate WarrantyController

deactivate Frontend
```

---

### 3.3.3 Manage Warranty Claim Flow (Admin)

The Manage Warranty Claim Flow sequence diagram illustrates how administrators review and manage warranty claim requests submitted by customers. The administrator retrieves the list of warranty claims, reviews the detailed claim information, and determines whether the claim should be approved or rejected. The system updates the claim status in the database and returns the operation result, allowing the administrator to complete the warranty claim management process.

```mermaid
sequenceDiagram

autonumber

actor Admin

participant Frontend as React Frontend
participant WarrantyController
participant DB as MySQL Database

%% ======================================
%% View Warranty Claims
%% ======================================

Admin->>Frontend: Open Warranty Claims

activate Frontend

Frontend->>WarrantyController: GET /warranty/claims

activate WarrantyController

WarrantyController->>DB: Retrieve Warranty Claims

activate DB

DB-->>WarrantyController: Warranty Claim List

deactivate DB

WarrantyController-->>Frontend: Return Claim List

Frontend-->>Admin: Display Warranty Claims

deactivate WarrantyController

deactivate Frontend

%% ======================================
%% View Claim Detail
%% ======================================

Admin->>Frontend: Select Warranty Claim

activate Frontend

Frontend->>WarrantyController: GET /warranty/claims/{claimId}

activate WarrantyController

WarrantyController->>DB: Retrieve Claim Detail

activate DB

DB-->>WarrantyController: Claim Detail

deactivate DB

WarrantyController-->>Frontend: Return Claim Detail

Frontend-->>Admin: Display Claim Detail

deactivate WarrantyController

deactivate Frontend

%% ======================================
%% Review Warranty Claim
%% ======================================

Admin->>Frontend: Review Warranty Claim

activate Frontend

Frontend->>WarrantyController: Update Claim Status

activate WarrantyController

alt Claim Approved

WarrantyController->>DB: Update Status = Approved

activate DB

DB-->>WarrantyController: Update Successful

deactivate DB

WarrantyController-->>Frontend: Claim Approved

Frontend-->>Admin: Display Approval Success

else Claim Rejected

WarrantyController->>DB: Update Status = Rejected

activate DB

DB-->>WarrantyController: Update Successful

deactivate DB

WarrantyController-->>Frontend: Claim Rejected

Frontend-->>Admin: Display Rejection Success

end

deactivate WarrantyController

deactivate Frontend
```

---

### 3.3.4 Admin Add Product Flow

The Admin Add Product Flow sequence diagram illustrates the process of adding a new product to the TechPulse E-Commerce System. The administrator opens the product management page, enters the product information, and uploads the product image. The image is stored in the local uploads folder, and the generated image path is associated with the product information before being saved in the database. After successful validation and storage, the system confirms that the product has been created successfully.

```mermaid
sequenceDiagram

autonumber

actor Admin

participant Frontend as React Frontend
participant ProductController
participant UploadModule
participant DB as MySQL Database
participant Storage as Uploads Folder

%% ======================================
%% Open Product Management
%% ======================================

Admin->>Frontend: Open Product Management

activate Frontend

Frontend->>ProductController: GET /products

activate ProductController

ProductController->>DB: Retrieve Product List

activate DB

DB-->>ProductController: Product List

deactivate DB

ProductController-->>Frontend: Return Product List

Frontend-->>Admin: Display Product List

deactivate ProductController

deactivate Frontend

%% ======================================
%% Add New Product
%% ======================================

Admin->>Frontend: Add New Product

activate Frontend

Frontend->>ProductController: Enter Product Information

activate ProductController

%% ======================================
%% Upload Image
%% ======================================

Frontend->>UploadModule: Upload Product Image

activate UploadModule

UploadModule->>Storage: Save Image File

activate Storage

Storage-->>UploadModule: Upload Successful

deactivate Storage

UploadModule-->>ProductController: Return Image Path

deactivate UploadModule

%% ======================================
%% Save Product
%% ======================================

ProductController->>DB: Save Product Information

activate DB

DB-->>ProductController: Product Created

deactivate DB

ProductController-->>Frontend: Product Created Successfully

Frontend-->>Admin: Display Success Message

deactivate ProductController

deactivate Frontend
```

---

### 3.3.5 Admin Manage Order Flow

The Admin Manage Order Flow sequence diagram illustrates how administrators manage customer orders within the TechPulse E-Commerce System. The administrator retrieves the order list, views the details of a selected order, and updates its status based on the current order processing stage. The system validates the update request, stores the new order status in the database, and returns a confirmation message indicating that the order has been updated successfully.

```mermaid
sequenceDiagram

autonumber

actor Admin

participant Frontend as React Frontend
participant ProductController
participant UploadModule
participant Storage as Uploads Folder
participant DB as MySQL Database

%% ==========================================
%% Open Product Management
%% ==========================================

Admin->>Frontend: Open Product Management

activate Frontend

Frontend->>ProductController: Request Product List

activate ProductController

ProductController->>DB: Retrieve Products

activate DB

DB-->>ProductController: Product List

deactivate DB

ProductController-->>Frontend: Return Product List

Frontend-->>Admin: Display Product Management Page

deactivate ProductController

deactivate Frontend

%% ==========================================
%% Add New Product
%% ==========================================

Admin->>Frontend: Click Add Product

activate Frontend

Frontend-->>Admin: Display Product Form

Admin->>Frontend: Enter Product Information

%% ==========================================
%% Upload Image
%% ==========================================

Admin->>Frontend: Select Product Image

Frontend->>UploadModule: Upload Image

activate UploadModule

UploadModule->>Storage: Save Image File

activate Storage

Storage-->>UploadModule: Image Saved

deactivate Storage

UploadModule-->>Frontend: Return Image Path

deactivate UploadModule

%% ==========================================
%% Save Product
%% ==========================================

Frontend->>ProductController: Submit Product Data

activate ProductController

ProductController->>DB: Save Product Information

activate DB

DB-->>ProductController: Product Created

deactivate DB

ProductController-->>Frontend: Return Success

Frontend-->>Admin: Display Product Created Successfully

deactivate ProductController

deactivate Frontend
```

---

## 3.4 Data Schema (JSON)

### Overview

The following JSON schemas represent the primary data entities used in the TechPulse E-Commerce System. The schemas are organized into logical modules based on the system architecture, making it easier to understand the relationship between business functions and stored data.

---

# 3.4.1 Identity Management

The Identity Management module stores user authentication, authorization, and shipping address information.

---

### Role

```json
{
  "roleId": 1,
  "roleName": "Customer",
  "description": "Standard customer account."
}
```

Represents a system role used for authorization and access control.

---

### User

```json
{
  "userId": 1,
  "roleId": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "passwordHash": "$2b$10$xxxxxxxx",
  "phone": "0812345678",
  "createdAt": "2026-07-14T10:00:00Z",
  "updatedAt": "2026-07-14T10:00:00Z"
}
```

Represents a registered user of the system.

---

### Address

```json
{
  "addressId": 1,
  "userId": 1,
  "recipientName": "John Doe",
  "phone": "0812345678",
  "address": "99 ถนนสุขุมวิท",
  "district": "คลองเตย",
  "province": "Bangkok",
  "postalCode": "10110",
  "isDefault": true,
  "createdAt": "2026-07-14T10:00:00Z",
  "updatedAt": "2026-07-14T10:00:00Z"
}
```

Represents a customer's shipping address.

---

# 3.4.2 Product Catalog Management

The Product Catalog module stores information related to product categories, brands, products, and product images.

---

### Category

```json
{
  "categoryId": 1,
  "categoryName": "Notebook"
}
```

Represents a product category.

---

### Brand

```json
{
  "brandId": 1,
  "brandName": "ASUS"
}
```

Represents a product brand.

---

### Product

```json
{
  "productId": 101,
  "categoryId": 1,
  "brandId": 1,
  "productName": "ASUS ROG Strix G16",
  "description": "Gaming Notebook",
  "price": 45990,
  "stock": 12,
  "warrantyProvider": "ASUS Thailand",
  "status": "Available",
  "createdAt": "2026-07-14T10:00:00Z",
  "updatedAt": "2026-07-14T10:00:00Z"
}
```

Represents a product available in the system.

---

### Product Image

```json
{
  "imageId": 1,
  "productId": 101,
  "imageUrl": "/uploads/products/g16-front.jpg",
  "isPrimary": true
}
```

Represents a product image.

---

# 3.4.3 Shopping Cart Management

The Shopping Cart module stores customer shopping carts and selected products before checkout.

---

### Shopping Cart

```json
{
  "cartId": 1,
  "userId": 1,
  "createdAt": "2026-07-14T10:00:00Z",
  "updatedAt": "2026-07-14T10:00:00Z"
}
```

Represents a customer's shopping cart.

---

### Cart Item

```json
{
  "cartItemId": 1,
  "cartId": 1,
  "productId": 101,
  "quantity": 2
}
```

Represents a product stored in the shopping cart.

---

# 3.4.4 Order & Payment Management

The Order Management module stores customer orders, purchased products, and payment information.

---

### Order

```json
{
  "orderId": 1001,
  "userId": 1,
  "addressId": 1,
  "shippingName": "John Doe",
  "shippingPhone": "0812345678",
  "shippingAddress": "99 ถนนสุขุมวิท",
  "shippingPostalCode": "10110",
  "totalAmount": 91980,
  "orderStatus": "Paid",
  "orderDate": "2026-07-14T10:00:00Z"
}
```

Represents a customer order.

---

### Order Item

```json
{
  "orderItemId": 1,
  "orderId": 1001,
  "productId": 101,
  "quantity": 2,
  "unitPrice": 45990
}
```

Represents an individual purchased product within an order.

---

### Payment

```json
{
  "paymentId": 1,
  "orderId": 1001,
  "paymentMethod": "PromptPay",
  "amount": 91980,
  "paymentStatus": "Completed",
  "paymentDate": "2026-07-14T10:00:00Z"
}
```

Represents payment information for an order.

---

# 3.4.5 Warranty Management

The Warranty module stores warranty information and customer warranty claim requests.

---

### Warranty

```json
{
  "warrantyId": 1,
  "orderItemId": 1,
  "serialNumber": "ASUS-2026-000001",
  "expiryDate": "2028-07-14",
  "warrantyProvider": "ASUS Thailand",
  "warrantyStatus": "Active"
}
```

Represents warranty information for a purchased product.

---

### Warranty Claim

```json
{
  "claimId": 1,
  "warrantyId": 1,
  "userId": 1,
  "description": "Screen flickering issue",
  "claimStatus": "Pending",
  "claimDate": "2026-08-01T14:30:00Z"
}
```

Represents a customer's warranty claim request.