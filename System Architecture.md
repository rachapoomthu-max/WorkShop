graph TD

A[ลูกค้า]
B[ผู้ดูแลระบบ]

C[หน้าแรก]
D[หน้าสินค้า]
E[ตะกร้าสินค้า]
F[หน้าชำระเงิน]

G[จัดการสินค้า]
H[จัดการคำสั่งซื้อ]

I[Frontend<br/>React]
J[Backend<br/>Node.js]
K[(MySQL)]
L[(Local Storage)]

A --> C
A --> D
A --> E
A --> F

B --> G
B --> H

C --> I
D --> I
E --> I
F --> I

G --> I
H --> I

I --> J
J --> K
I --> L