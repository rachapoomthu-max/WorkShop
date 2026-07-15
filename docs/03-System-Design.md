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

actor Customer

participant FE as React Frontend
participant ProductController
participant CartController
participant OrderController
participant PaymentController
participant DB as MySQL Database

%% =====================================
%% Browse Products
%% =====================================

Customer->>FE: Browse Products
FE->>ProductController: GET /products
ProductController->>DB: Retrieve Product List
DB-->>ProductController: Product List
ProductController-->>FE: Return Product List
FE-->>Customer: Display Products

%% =====================================
%% View Product Detail
%% =====================================

Customer->>FE: View Product Detail
FE->>ProductController: GET /products/{id}
ProductController->>DB: Retrieve Product Detail
DB-->>ProductController: Product Detail
ProductController-->>FE: Return Product Detail
FE-->>Customer: Display Product Detail

%% =====================================
%% Add Product to Cart
%% =====================================

Customer->>FE: Add Product to Cart
FE->>CartController: POST /cart
CartController->>DB: Save Cart Item
DB-->>CartController: Cart Updated
CartController-->>FE: Success
FE-->>Customer: Display Updated Cart

%% =====================================
%% Checkout
%% =====================================

Customer->>FE: Checkout

FE->>OrderController: Validate JWT
OrderController-->>FE: Authenticated

FE->>OrderController: Validate Shopping Cart
OrderController->>DB: Retrieve Cart Items
DB-->>OrderController: Cart Items
OrderController-->>FE: Cart Valid

Customer->>FE: Select Shipping Address
Customer->>FE: Select Payment Method

FE->>OrderController: Place Order

%% =====================================
%% Validate Stock
%% =====================================

OrderController->>DB: Validate Product Stock
DB-->>OrderController: Stock Result

alt Stock Available

    OrderController->>DB: Create Order
    DB-->>OrderController: Order Created

    loop For Each Cart Item

        OrderController->>DB: Create Order Item
        DB-->>OrderController: Order Item Created

        OrderController->>DB: Update Product Stock
        DB-->>OrderController: Stock Updated

    end

    OrderController->>PaymentController: Process Payment

    PaymentController->>DB: Create Payment Record
    DB-->>PaymentController: Payment Recorded

    alt Payment Success

        PaymentController-->>OrderController: Payment Successful

        OrderController->>DB: Update Order Status = PAID
        DB-->>OrderController: Status Updated

        OrderController->>DB: Clear Shopping Cart
        DB-->>OrderController: Cart Cleared

        OrderController-->>FE: Order Completed
        FE-->>Customer: Display Order Success

    else Payment Failed

        PaymentController-->>OrderController: Payment Failed
        OrderController-->>FE: Payment Failed
        FE-->>Customer: Display Payment Failed

    end

else Out of Stock

    OrderController-->>FE: Product Out of Stock
    FE-->>Customer: Display Out of Stock Message

end
```

---

### 3.3.2 Warranty Claim Flow (Customer)

The Warranty Claim Flow sequence diagram illustrates the process of submitting a warranty claim for a purchased product. The customer first views their order history and warranty information, then selects an eligible product and submits a warranty claim. The system validates the request, stores the warranty claim in the database, and returns a confirmation message indicating that the claim has been successfully submitted for administrator review.

```mermaid
sequenceDiagram

actor Customer

participant FE as React Frontend
participant WarrantyController
participant DB as MySQL Database

%% =====================================
%% View Warranty List
%% =====================================

Customer->>FE: View My Warranties
FE->>WarrantyController: GET /warranties/my

WarrantyController->>DB: Retrieve Customer Warranties
DB-->>WarrantyController: Warranty List

WarrantyController-->>FE: Return Warranty List
FE-->>Customer: Display Warranty List

%% =====================================
%% View Warranty Detail
%% =====================================

Customer->>FE: View Warranty Detail

FE->>WarrantyController: GET /warranties/{id}

WarrantyController->>DB: Retrieve Warranty Detail
DB-->>WarrantyController: Warranty Detail

WarrantyController-->>FE: Return Warranty Detail
FE-->>Customer: Display Warranty Detail

%% =====================================
%% Submit Warranty Claim
%% =====================================

Customer->>FE: Submit Warranty Claim

FE->>WarrantyController: Validate JWT
WarrantyController-->>FE: Authenticated

FE->>WarrantyController: Validate Warranty

WarrantyController->>DB: Check Warranty Owner
DB-->>WarrantyController: Owner Verified

WarrantyController->>DB: Check Warranty Expiry
DB-->>WarrantyController: Warranty Status

alt Warranty Active

    WarrantyController->>DB: Check Existing Claim
    DB-->>WarrantyController: No Existing Claim

    WarrantyController->>DB: Create Warranty Claim
    DB-->>WarrantyController: Claim Created

    WarrantyController-->>FE: Claim Submitted Successfully
    FE-->>Customer: Display Success Message

else Warranty Expired

    WarrantyController-->>FE: Warranty Expired
    FE-->>Customer: Display Warranty Expired Message

else Claim Already Exists

    WarrantyController-->>FE: Duplicate Claim
    FE-->>Customer: Display Duplicate Claim Message

end
```

---

### 3.3.3 Manage Warranty Claim Flow (Admin)

The Manage Warranty Claim Flow sequence diagram illustrates how administrators review and manage warranty claim requests submitted by customers. The administrator retrieves the list of warranty claims, reviews the detailed claim information, and determines whether the claim should be approved or rejected. The system updates the claim status in the database and returns the operation result, allowing the administrator to complete the warranty claim management process.

```mermaid
sequenceDiagram

actor Admin

participant FE as React Frontend
participant WarrantyController
participant DB as MySQL Database

%% =====================================
%% View Warranty Claims
%% =====================================

Admin->>FE: View Warranty Claim List

FE->>WarrantyController: GET /warranty-claims

WarrantyController->>DB: Retrieve Warranty Claims
DB-->>WarrantyController: Warranty Claim List

WarrantyController-->>FE: Return Warranty Claim List
FE-->>Admin: Display Warranty Claim List

%% =====================================
%% View Claim Detail
%% =====================================

Admin->>FE: View Warranty Claim Detail

FE->>WarrantyController: GET /warranty-claims/{id}

WarrantyController->>DB: Retrieve Warranty Claim Detail
DB-->>WarrantyController: Warranty Claim Detail

WarrantyController-->>FE: Return Warranty Claim Detail
FE-->>Admin: Display Warranty Claim Detail

%% =====================================
%% Review Warranty Claim
%% =====================================

Admin->>FE: Review Warranty Claim

FE->>WarrantyController: Validate JWT
WarrantyController-->>FE: Authenticated

FE->>WarrantyController: Validate Warranty Claim

WarrantyController->>DB: Check Claim Status
DB-->>WarrantyController: Claim Status

%% =====================================
%% Update Warranty Claim
%% =====================================

Admin->>FE: Enter Admin Remark

Admin->>FE: Approve / Reject Claim

FE->>WarrantyController: Update Claim Status

alt Claim Approved

    WarrantyController->>DB: Update Claim Status = APPROVED
    DB-->>WarrantyController: Status Updated

    WarrantyController-->>FE: Claim Approved
    FE-->>Admin: Display Success Message

else Claim Rejected

    WarrantyController->>DB: Update Claim Status = REJECTED
    DB-->>WarrantyController: Status Updated

    WarrantyController-->>FE: Claim Rejected
    FE-->>Admin: Display Success Message

end
```

---

### 3.3.4 Admin Add Product Flow

The Admin Add Product Flow sequence diagram illustrates the process of adding a new product to the TechPulse E-Commerce System. The administrator opens the product management page, enters the product information, and uploads the product image. The image is stored in the local uploads folder, and the generated image path is associated with the product information before being saved in the database. After successful validation and storage, the system confirms that the product has been created successfully.

```mermaid
sequenceDiagram

actor Admin

participant FE as React Frontend
participant ProductController
participant UploadModule
participant Storage as Uploads Folder
participant DB as MySQL Database

%% =====================================
%% Open Product Management
%% =====================================

Admin->>FE: Open Product Management
FE-->>Admin: Display Product List

%% =====================================
%% Open Add Product Form
%% =====================================

Admin->>FE: Open Add Product Form
FE-->>Admin: Display Product Form

%% =====================================
%% Fill Product Information
%% =====================================

Admin->>FE: Enter Product Information
Admin->>FE: Select Category
Admin->>FE: Select Brand
Admin->>FE: Select Product Image

%% =====================================
%% Upload Product Image
%% =====================================

FE->>UploadModule: Upload Product Image
UploadModule->>Storage: Save Image File
Storage-->>UploadModule: Image Saved
UploadModule-->>FE: Return Image URL

%% =====================================
%% Submit Product
%% =====================================

Admin->>FE: Submit Product

FE->>ProductController: Validate JWT
ProductController-->>FE: Authenticated

FE->>ProductController: Validate Product Data

alt Product Data Valid

    ProductController->>DB: Validate Category
    DB-->>ProductController: Category Exists

    ProductController->>DB: Validate Brand
    DB-->>ProductController: Brand Exists

    ProductController->>DB: Create Product
    DB-->>ProductController: Product Created

    ProductController-->>FE: Product Created Successfully
    FE-->>Admin: Display Success Message

else Invalid Product Data

    ProductController-->>FE: Validation Failed
    FE-->>Admin: Display Validation Error

end
```

---

### 3.3.5 Admin Manage Order Flow

The Admin Manage Order Flow sequence diagram illustrates how administrators manage customer orders within the TechPulse E-Commerce System. The administrator retrieves the order list, views the details of a selected order, and updates its status based on the current order processing stage. The system validates the update request, stores the new order status in the database, and returns a confirmation message indicating that the order has been updated successfully.

```mermaid
sequenceDiagram

actor Admin

participant FE as React Frontend
participant OrderController
participant WarrantyController
participant DB as MySQL Database

%% =====================================
%% Open Order Management
%% =====================================

Admin->>FE: Open Order Management
FE->>OrderController: GET /orders

OrderController->>DB: Retrieve Order List
DB-->>OrderController: Order List

OrderController-->>FE: Return Order List
FE-->>Admin: Display Order List

%% =====================================
%% View Order Detail
%% =====================================

Admin->>FE: View Order Detail

FE->>OrderController: GET /orders/{id}

OrderController->>DB: Retrieve Order Detail
DB-->>OrderController: Order Detail

OrderController-->>FE: Return Order Detail
FE-->>Admin: Display Order Detail

%% =====================================
%% Review Order
%% =====================================

Admin->>FE: Review Order

FE->>OrderController: Validate JWT
OrderController-->>FE: Authenticated

FE->>OrderController: Validate Order

OrderController->>DB: Check Current Order Status
DB-->>OrderController: Order Status

%% =====================================
%% Update Order Status
%% =====================================

Admin->>FE: Approve / Reject Order

FE->>OrderController: Update Order Status

alt Order Approved

    OrderController->>DB: Update Order Status = APPROVED
    DB-->>OrderController: Status Updated

    %% =====================================
    %% Generate Warranty
    %% =====================================

    OrderController->>WarrantyController: Generate Warranty

    WarrantyController->>DB: Create Warranty Record
    DB-->>WarrantyController: Warranty Created

    WarrantyController-->>OrderController: Warranty Generated

    OrderController-->>FE: Order Approved Successfully
    FE-->>Admin: Display Success Message

else Order Rejected

    OrderController->>DB: Update Order Status = REJECTED
    DB-->>OrderController: Status Updated

    OrderController-->>FE: Order Rejected Successfully
    FE-->>Admin: Display Success Message

end
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