# MooTleComKub - Data Schema

-   **Version:** 4.2-fully-verified-with-source-citations
-   **Tables:** 16
-   **Known Issues:** 3

## Tables

### `roles`

  Column        Type             Nullable Key
  ------------- -------------- ---------- -----
  role_id       int                    No PRI
  role_name     varchar(50)            No UNI
  description   varchar(255)          Yes 
  created_at    timestamp             Yes 
  updated_at    timestamp             Yes 

### `users`

  Column          Type                                      Nullable Key
  --------------- --------------------------------------- ---------- -----
  user_id         int                                             No PRI
  role_id         int                                             No MUL
  first_name      varchar(100)                                    No 
  last_name       varchar(100)                                    No 
  email           varchar(255)                                    No UNI
  password_hash   varchar(255)                                    No 
  phone           varchar(20)                                    Yes 
  status          enum('ACTIVE','INACTIVE','SUSPENDED')           No MUL
  created_at      timestamp                                      Yes 
  updated_at      timestamp                                      Yes 

**Foreign Keys** - `role_id` → `roles.role_id`

### `addresses`

  Column           Type             Nullable Key
  ---------------- -------------- ---------- -----
  address_id       int                    No PRI
  user_id          int                    No MUL
  recipient_name   varchar(150)           No 
  phone            varchar(20)            No 
  address_line     varchar(255)           No 
  subdistrict      varchar(100)           No 
  district         varchar(100)           No 
  province         varchar(100)           No 
  postal_code      varchar(10)            No 
  is_default       tinyint(1)             No MUL
  created_at       timestamp             Yes 
  updated_at       timestamp             Yes 

**Foreign Keys** - `user_id` → `users.user_id`

### `categories`

  Column          Type                          Nullable Key
  --------------- --------------------------- ---------- -----
  category_id     int                                 No PRI
  category_name   varchar(100)                        No UNI
  description     varchar(255)                       Yes 
  status          enum('ACTIVE','INACTIVE')           No MUL
  created_at      timestamp                          Yes 
  updated_at      timestamp                          Yes 

### `brands`

  Column        Type                          Nullable Key
  ------------- --------------------------- ---------- -----
  brand_id      int                                 No PRI
  brand_name    varchar(100)                        No MUL
  category_id   int                                 No 
  description   varchar(255)                       Yes 
  status        enum('ACTIVE','INACTIVE')           No MUL
  created_at    timestamp                          Yes 
  updated_at    timestamp                          Yes 

**Foreign Keys** - `category_id` → `categories.category_id`

### `products`

  Column              Type                          Nullable Key
  ------------------- --------------------------- ---------- -----
  product_id          int                                 No PRI
  category_id         int                                 No MUL
  brand_id            int                                 No MUL
  sku                 varchar(100)                        No UNI
  image               varchar(255)                       Yes 
  product_name        varchar(255)                        No MUL
  description         text                               Yes 
  price               decimal(10,2)                       No MUL
  stock               int                                 No 
  warranty_provider   varchar(100)                       Yes 
  status              enum('ACTIVE','INACTIVE')           No MUL
  created_at          timestamp                          Yes 
  updated_at          timestamp                          Yes 

**Foreign Keys** - `category_id` → `categories.category_id` - `brand_id`
→ `brands.brand_id`

### `spec_templates`

  Column        Type             Nullable Key
  ------------- -------------- ---------- -----
  template_id   int                    No PRI
  category_id   int                    No MUL
  spec_name     varchar(100)           No 
  created_at    timestamp              No 
  updated_at    timestamp              No 

**Foreign Keys** - `category_id` → `categories.category_id`

### `product_specs`

  Column       Type             Nullable Key
  ------------ -------------- ---------- -----
  spec_id      int                    No PRI
  product_id   int                    No MUL
  spec_name    varchar(100)           No 
  spec_value   varchar(255)           No 
  created_at   timestamp              No 
  updated_at   timestamp              No 

**Foreign Keys** - `product_id` → `products.product_id`

### `shopping_carts`

  Column         Type              Nullable Key
  -------------- --------------- ---------- -----
  cart_id        int                     No PRI
  user_id        int                     No UNI
  created_at     timestamp              Yes 
  updated_at     timestamp              Yes 
  total_amount   decimal(10,2)           No 

**Foreign Keys** - `user_id` → `users.user_id`

### `cart_items`

  Column         Type              Nullable Key
  -------------- --------------- ---------- -----
  cart_item_id   int                     No PRI
  cart_id        int                     No MUL
  product_id     int                     No MUL
  quantity       int                     No 
  created_at     timestamp              Yes 
  updated_at     timestamp              Yes 
  subtotal       decimal(10,2)           No 

**Foreign Keys** - `cart_id` → `shopping_carts.cart_id` - `product_id` →
`products.product_id`

### `orders`

  -------------------------------------------------------------------------------------------------------------------------------------
  Column                 Type                                                                                 Nullable Key
  ---------------------- ----------------------------------------------------------------------- --------------------- ----------------
  order_id               int                                                                                        No PRI

  order_number           varchar(30)                                                                                No UNI

  user_id                int                                                                                        No MUL

  address_id             int                                                                                        No MUL

  shipping_name          varchar(150)                                                                               No 

  shipping_phone         varchar(20)                                                                                No 

  shipping_address       varchar(255)                                                                               No 

  shipping_subdistrict   varchar(100)                                                                               No 

  shipping_district      varchar(100)                                                                               No 

  shipping_province      varchar(100)                                                                               No 

  shipping_postal_code   varchar(10)                                                                                No 

  total_amount           decimal(10,2)                                                                              No 

  order_status           enum('PENDING','PAID','PROCESSING','SHIPPED','DELIVERED','CANCELLED')                      No MUL

  order_date             datetime                                                                                  Yes MUL

  created_at             timestamp                                                                                 Yes 

  updated_at             timestamp                                                                                 Yes 
  -------------------------------------------------------------------------------------------------------------------------------------

**Foreign Keys** - `user_id` → `users.user_id` - `address_id` →
`addresses.address_id`

### `order_items`

  Column          Type              Nullable Key
  --------------- --------------- ---------- -----
  order_item_id   int                     No PRI
  order_id        int                     No MUL
  product_id      int                     No MUL
  quantity        int                     No 
  unit_price      decimal(10,2)           No 
  subtotal        decimal(10,2)           No 
  created_at      timestamp              Yes 

**Foreign Keys** - `order_id` → `orders.order_id` - `product_id` →
`products.product_id`

### `payments`

  -------------------------------------------------------------------------------------------------------------------------------
  Column              Type                                                                              Nullable Key
  ------------------- -------------------------------------------------------------------- --------------------- ----------------
  payment_id          int                                                                                     No PRI

  order_id            int                                                                                     No UNI

  payment_method      enum('PROMPTPAY','CREDIT_CARD','BANK_TRANSFER','CASH_ON_DELIVERY')                      No MUL

  amount              decimal(10,2)                                                                           No 

  payment_status      enum('PENDING','PAID','FAILED','REFUNDED')                                              No MUL

  payment_reference   varchar(100)                                                                           Yes 

  paid_at             datetime                                                                               Yes 

  created_at          timestamp                                                                              Yes 

  updated_at          timestamp                                                                              Yes 

  transaction_id      varchar(100)                                                                           Yes None
  -------------------------------------------------------------------------------------------------------------------------------

**Foreign Keys** - `order_id` → `orders.order_id`

### `admin_page_permissions`

  Column       Type            Nullable Key
  ------------ ------------- ---------- -----
  id           int                   No PRI
  user_id      int                   No MUL
  page_key     varchar(50)           No 
  can_view     tinyint(1)            No 
  can_manage   tinyint(1)            No 
  created_at   timestamp            Yes 
  updated_at   timestamp            Yes 

**Foreign Keys** - `user_id` → `users.user_id`

### `system_logs`

  Column        Type             Nullable Key
  ------------- -------------- ---------- -----
  log_id        int                    No PRI
  user_id       int                   Yes MUL
  action        varchar(255)           No 
  description   text                  Yes 
  ip_address    varchar(45)           Yes 
  created_at    datetime              Yes 

**Foreign Keys** - `user_id` → `users.user_id`

### `system_settings`

  Column          Type             Nullable Key
  --------------- -------------- ---------- -----
  setting_key     varchar(100)           No PRI
  setting_value   text                  Yes 
  updated_at      datetime              Yes 
