import { db } from "./firebase.js";

import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ---------- UAT DATA (JSON) ----------
const uatData = {
  modules: [
    {
      id: "cus-guest",
      name: "1.0 การเข้าถึงระบบแบบไม่เข้าสู่ระบบ (Guest)",
      tag: "CUSTOMER",
      cases: [
        {
          id: "CUS-GST-01",
          title: "Guest เข้าดูหน้าแรก/รายการสินค้าได้โดยไม่ต้องเข้าสู่ระบบ",
          priority: "high",
          steps:
            "1. ออกจากระบบ (หรือเปิดเบราว์เซอร์ใหม่โดยไม่ Login)\n2. เข้าหน้าแรกของเว็บไซต์โดยตรง",
          expected:
            "แสดงหน้าแรกพร้อมรายการสินค้า ค้นหา และตัวกรองได้ครบถ้วนโดยไม่ถูกบังคับให้ Login ก่อน",
        },
        {
          id: "CUS-GST-02",
          title: "Guest ดูรายละเอียดสินค้าได้โดยไม่ต้องเข้าสู่ระบบ",
          priority: "high",
          steps: "1. ในสถานะ Guest คลิกเลือกสินค้าจากรายการ",
          expected:
            "แสดงหน้ารายละเอียดสินค้าครบถ้วนเหมือนผู้ใช้ที่เข้าสู่ระบบแล้ว",
        },
        {
          id: "CUS-GST-03",
          title: "Guest กดเพิ่มสินค้าลงตะกร้า ต้องถูกนำไปเข้าสู่ระบบก่อน",
          priority: "high",
          steps:
            "1. ในสถานะ Guest เปิดหน้าแรกหรือหน้ารายละเอียดสินค้า\n2. กดปุ่ม 'หยิบใส่ตะกร้า' หรือ 'ซื้อทันที'",
          expected:
            "ระบบแสดงข้อความแจ้งเตือนให้เข้าสู่ระบบก่อน จากนั้นนำไปยังหน้า Login โดยไม่มีการเพิ่มสินค้าลงตะกร้าจริง",
        },
        {
          id: "CUS-GST-04",
          title: "Guest ไม่สามารถเข้าหน้าที่ต้องเข้าสู่ระบบได้โดยตรง",
          priority: "high",
          steps:
            "1. ในสถานะ Guest พิมพ์ URL ตรงไปยังหน้าตะกร้า/ชำระเงิน/คำสั่งซื้อ/บัญชีของฉัน",
          expected:
            "ระบบนำไปยังหน้า Login ทุกครั้ง ไม่อนุญาตให้เห็นเนื้อหาของหน้าที่ต้องเข้าสู่ระบบก่อน",
        },
      ],
    },
    {
      id: "cus-account",
      name: "1.1 การจัดการบัญชีผู้ใช้งาน (Customer)",
      tag: "CUSTOMER",
      cases: [
        {
          id: "CUS-ACC-01",
          title: "สมัครสมาชิกเพื่อเข้าใช้งานระบบ",
          priority: "high",
          steps:
            "1. เข้าหน้าสมัครสมาชิก\n2. กรอกข้อมูล (ชื่อ, อีเมล, รหัสผ่าน, เบอร์โทร)\n3. กดยืนยันการสมัคร",
          expected:
            "ระบบสร้างบัญชีผู้ใช้ใหม่สำเร็จ ตรวจสอบความถูกต้องของข้อมูล (อีเมลซ้ำ/รูปแบบไม่ถูกต้อง) ก่อนบันทึก",
        },
        {
          id: "CUS-ACC-02",
          title: "เข้าสู่ระบบ (Login)",
          priority: "high",
          steps:
            "1. กรอกอีเมล/ชื่อผู้ใช้และรหัสผ่าน\n2. กดเข้าสู่ระบบ\n3. ทดสอบกรณีกรอกรหัสผ่านผิด",
          expected:
            "เข้าสู่ระบบสำเร็จเมื่อข้อมูลถูกต้อง และแสดง error ที่ชัดเจนเมื่อข้อมูลไม่ถูกต้อง โดยไม่ระบุว่าผิดที่อีเมลหรือรหัสผ่าน",
        },
        {
          id: "CUS-ACC-03",
          title: "ออกจากระบบ (Logout)",
          priority: "med",
          steps:
            "1. เข้าสู่ระบบสำเร็จแล้ว\n2. กดเมนู 'ออกจากระบบ'\n3. ลองพิมพ์ URL ย้อนกลับไปหน้าที่ต้องเข้าสู่ระบบ",
          expected:
            "ออกจากระบบสำเร็จ กลับสู่สถานะ Guest และไม่สามารถเข้าหน้าที่ต้องเข้าสู่ระบบได้อีกจนกว่าจะ Login ใหม่",
        },
      ],
    },
    {
      id: "cus-search",
      name: "1.2 การค้นหาและเลือกซื้อสินค้า (Customer)",
      tag: "CUSTOMER",
      cases: [
        {
          id: "CUS-SRC-01",
          title: "ค้นหาสินค้าจากชื่อสินค้า แบรนด์ หรือรหัส SKU",
          priority: "high",
          steps:
            "1. พิมพ์คำค้นหาในช่องค้นหา (ทดสอบทั้งชื่อสินค้า, ชื่อแบรนด์, และรหัส SKU)\n2. กดค้นหา",
          expected:
            "ระบบแสดงรายการสินค้าที่ตรงหรือใกล้เคียงกับคำค้นหาไม่ว่าจะพิมพ์ชื่อสินค้า ชื่อแบรนด์ หรือรหัส SKU และแสดงข้อความเมื่อไม่พบสินค้า",
        },
        {
          id: "CUS-SRC-02",
          title: "เลือกดูสินค้าตามหมวดหมู่",
          priority: "med",
          steps:
            "1. เลือกหมวดหมู่สินค้าจากเมนู\n2. ดูรายการสินค้าในหมวดหมู่นั้น",
          expected:
            "ระบบกรองและแสดงเฉพาะสินค้าที่อยู่ในหมวดหมู่ที่เลือกได้ถูกต้อง",
        },
        {
          id: "CUS-SRC-03",
          title: "ดูรายละเอียดของสินค้าแต่ละรายการ",
          priority: "high",
          steps: "1. คลิกเลือกสินค้าจากรายการ",
          expected:
            "แสดงรายละเอียดสินค้าครบถ้วน (ชื่อ, คำอธิบาย, ราคา, สต็อกคงเหลือ, รูปภาพ)",
        },
      ],
    },
    {
      id: "cus-cart",
      name: "1.3 การจัดการตะกร้าสินค้า (Customer)",
      tag: "CUSTOMER",
      cases: [
        {
          id: "CUS-CART-01",
          title: "เพิ่มสินค้าลงในตะกร้า",
          priority: "high",
          steps: "1. เลือกจำนวนสินค้า\n2. กดเพิ่มลงตะกร้า",
          expected:
            "สินค้าถูกเพิ่มลงตะกร้าพร้อมจำนวนที่ถูกต้อง และไม่สามารถเพิ่มเกินจำนวนสต็อกที่มี",
        },
        {
          id: "CUS-CART-02",
          title: "แก้ไขจำนวนสินค้าในตะกร้า",
          priority: "med",
          steps: "1. เปิดตะกร้าสินค้า\n2. เพิ่ม/ลดจำนวนสินค้าในรายการ",
          expected: "ยอดรวมราคาคำนวณใหม่ถูกต้องทันทีเมื่อจำนวนเปลี่ยนแปลง",
        },
        {
          id: "CUS-CART-03",
          title: "ลบสินค้าออกจากตะกร้า",
          priority: "med",
          steps: "1. เปิดตะกร้าสินค้า\n2. กดลบสินค้าที่ต้องการออก",
          expected: "สินค้าถูกลบออกจากตะกร้า และยอดรวมอัปเดตให้ถูกต้องทันที",
        },
        {
          id: "CUS-CART-04",
          title: "ตรวจสอบรายการสินค้าในตะกร้า",
          priority: "med",
          steps: "1. เปิดหน้าตะกร้าสินค้า",
          expected:
            "แสดงรายการสินค้า จำนวน ราคาต่อชิ้น และยอดรวมทั้งหมดถูกต้องครบถ้วน",
        },
      ],
    },
    {
      id: "cus-order",
      name: "1.4 การสั่งซื้อสินค้า (Customer)",
      tag: "CUSTOMER",
      cases: [
        {
          id: "CUS-ORD-01",
          title: "เลือกที่อยู่สำหรับการจัดส่งสินค้า",
          priority: "high",
          steps:
            "1. ระหว่างขั้นตอน Checkout\n2. เลือกที่อยู่จัดส่งจากรายการที่บันทึกไว้",
          expected: "ที่อยู่ที่เลือกถูกนำไปใช้ในคำสั่งซื้อได้ถูกต้อง",
        },
        {
          id: "CUS-ORD-02",
          title: "ชำระเงินผ่านระบบจำลอง (Mock Payment) และตัดสต็อกสินค้า",
          priority: "high",
          steps:
            "1. เลือกวิธีชำระเงินในระบบจำลอง\n2. ยืนยันการชำระเงิน\n3. เปิดหน้า Admin: Products ตรวจสอบจำนวนสต็อกของสินค้านั้นก่อนและหลังชำระเงิน",
          expected:
            "ระบบอัปเดตสถานะคำสั่งซื้อเป็น 'ชำระเงินแล้ว' ทันทีที่ชำระเงินสำเร็จ และจำนวนสต็อกสินค้าต้องลดลงตามจำนวนที่ซื้อทันทีในจังหวะเดียวกัน (ไม่ใช่ตอนสร้างคำสั่งซื้อ)",
        },
        {
          id: "CUS-ORD-03",
          title: "ตรวจสอบข้อมูลการสั่งซื้อก่อนยืนยันรายการ",
          priority: "high",
          steps:
            "1. กด Checkout จากตะกร้า\n2. ตรวจสอบสรุปรายการสินค้า ที่อยู่ และยอดชำระ",
          expected:
            "หน้าสรุปแสดงข้อมูลครบถ้วนถูกต้องก่อนให้ลูกค้ายืนยัน ป้องกันการกดยืนยันโดยไม่ได้ตรวจสอบ",
        },
        {
          id: "CUS-ORD-04",
          title: "ยืนยันคำสั่งซื้อสินค้า",
          priority: "high",
          steps: "1. ตรวจสอบข้อมูลครบถ้วน\n2. กดยืนยันคำสั่งซื้อ",
          expected:
            "ระบบสร้างคำสั่งซื้อใหม่ (สถานะเริ่มต้น 'รอดำเนินการ') และแสดงเลขที่คำสั่งซื้อให้ลูกค้า",
        }
      ],
    },
    {
      id: "cus-track",
      name: "1.5 การติดตามคำสั่งซื้อ (Customer)",
      tag: "CUSTOMER",
      cases: [
        {
          id: "CUS-TRK-01",
          title: "ตรวจสอบสถานะของคำสั่งซื้อ",
          priority: "high",
          steps:
            "1. เข้าเมนูคำสั่งซื้อของฉัน\n2. เลือกคำสั่งซื้อที่ต้องการตรวจสอบ",
          expected:
            "สถานะที่แสดงตรงกับสถานะจริงในระบบ (เช่น รอดำเนินการ/ชำระเงินแล้ว/กำลังจัดส่ง/สำเร็จ/ยกเลิก)",
        },
        {
          id: "CUS-TRK-02",
          title: "ดูประวัติการสั่งซื้อทั้งหมดของตนเอง",
          priority: "med",
          steps: "1. เข้าเมนูประวัติการสั่งซื้อ",
          expected:
            "แสดงรายการคำสั่งซื้อทั้งหมดของลูกค้ารายนั้นเรียงตามวันที่ ครบถ้วนถูกต้อง",
        },
      ],
    },
    {
      id: "cus-address",
      name: "1.6 การจัดการที่อยู่จัดส่ง (Customer)",
      tag: "CUSTOMER",
      cases: [
        {
          id: "CUS-ADR-01",
          title: "เพิ่มข้อมูลที่อยู่จัดส่ง",
          priority: "med",
          steps:
            "1. เข้าเมนูจัดการที่อยู่\n2. กรอกข้อมูลที่อยู่ใหม่\n3. บันทึก",
          expected: "ที่อยู่ใหม่ถูกบันทึกและปรากฏในรายการที่อยู่ของลูกค้า",
        },
        {
          id: "CUS-ADR-02",
          title: "แก้ไขข้อมูลที่อยู่จัดส่ง",
          priority: "med",
          steps: "1. เลือกที่อยู่ที่ต้องการแก้ไข\n2. แก้ไขข้อมูลและบันทึก",
          expected: "ข้อมูลที่อยู่อัปเดตถูกต้องตามที่แก้ไข",
        },
        {
          id: "CUS-ADR-03",
          title: "ลบข้อมูลที่อยู่จัดส่ง",
          priority: "low",
          steps: "1. เลือกที่อยู่ที่ต้องการลบ\n2. ยืนยันการลบ",
          expected:
            "ที่อยู่ถูกลบออกจากรายการ และไม่สามารถเลือกใช้ที่อยู่นี้ในการสั่งซื้อครั้งถัดไปได้",
        }
      ],
    },
    {
      id: "adm-account",
      name: "2.0 การเข้าสู่ระบบ (Admin)",
      tag: "ADMIN",
      cases: [
        {
          id: "ADM-ACC-01",
          title: "เข้าสู่ระบบด้วยบัญชี Admin",
          priority: "high",
          steps:
            "1. กรอกอีเมล/รหัสผ่านของบัญชี Admin ในฟอร์ม Login เดียวกับลูกค้า\n2. กดเข้าสู่ระบบ\n3. ตรวจสอบเมนู 'บัญชีของฉัน' มุมขวาบน",
          expected:
            "เข้าสู่ระบบสำเร็จ ระบบพาไปหน้าแรกตามปกติ และต้องเห็นเมนู 'Admin Console' เพิ่มเข้ามาใน Dropdown บัญชี (ต่างจากลูกค้าทั่วไปที่ไม่มีเมนูนี้)",
        },
        {
          id: "ADM-ACC-02",
          title: "เข้าถึงหน้า Admin Panel ผ่านเมนู Admin Console",
          priority: "high",
          steps:
            "1. หลังเข้าสู่ระบบด้วยบัญชี Admin แล้ว\n2. กด Dropdown บัญชี → เลือก 'Admin Console'",
          expected:
            "ระบบพาเข้าสู่หน้า Dashboard ของผู้ดูแลระบบ และเห็นเมนู Sidebar ครบตามสิทธิ์ Admin (Dashboard, Categories, Products, Orders, Customers) แต่ไม่เห็นเมนูเฉพาะ Super Admin",
        },
        {
          id: "ADM-ACC-03",
          title: "Admin ทั่วไปไม่สามารถเข้าถึงฟังก์ชันเฉพาะ Super Admin ได้",
          priority: "high",
          steps:
            "1. เข้าสู่ระบบด้วยบัญชี Admin (ไม่ใช่ Super Admin)\n2. พยายามเข้าหน้าที่สงวนไว้เฉพาะ Super Admin ผ่านการพิมพ์ URL ตรง (เช่น หน้ารายงาน/จัดการแอดมิน)",
          expected:
            "ระบบต้องบล็อกการเข้าถึง (แสดงข้อความปฏิเสธสิทธิ์หรือนำออกจากหน้านั้น) ไม่อนุญาตให้ Admin ทั่วไปเข้าฟังก์ชันของ Super Admin",
        },
        {
          id: "ADM-ACC-04",
          title: "ออกจากระบบของบัญชี Admin",
          priority: "med",
          steps:
            "1. เข้าสู่ระบบด้วยบัญชี Admin\n2. กดออกจากระบบ\n3. ลองพิมพ์ URL ย้อนกลับไปหน้า Admin Panel",
          expected:
            "ออกจากระบบสำเร็จ และไม่สามารถเข้าหน้า Admin Panel ได้อีกจนกว่าจะเข้าสู่ระบบใหม่",
        },
      ],
    },
    {
      id: "adm-product",
      name: "2.1 การจัดการข้อมูลสินค้า (Admin)",
      tag: "ADMIN",
      cases: [
        {
          id: "ADM-PRD-01",
          title: "เพิ่มข้อมูลสินค้า",
          priority: "high",
          steps:
            "1. เข้าเมนูจัดการสินค้า\n2. กรอกข้อมูลสินค้าใหม่ครบถ้วน\n3. บันทึก",
          expected: "สินค้าใหม่ถูกบันทึกและปรากฏในรายการสินค้าฝั่งลูกค้าทันที",
        },
        {
          id: "ADM-PRD-02",
          title: "แก้ไขข้อมูลสินค้า",
          priority: "high",
          steps: "1. เลือกสินค้าที่ต้องการแก้ไข\n2. แก้ไขข้อมูลและบันทึก",
          expected:
            "ข้อมูลสินค้าที่แก้ไขอัปเดตถูกต้องทั้งฝั่งแอดมินและฝั่งลูกค้า",
        },
        {
          id: "ADM-PRD-03",
          title: "ลบข้อมูลสินค้า",
          priority: "med",
          steps: "1. เลือกสินค้าที่ต้องการลบ\n2. ยืนยันการลบ",
          expected:
            "สินค้าถูกลบหรือถูกปิดการขาย และไม่แสดงในรายการฝั่งลูกค้าอีกต่อไป",
        },
        {
          id: "ADM-PRD-04",
          title: "ดูรายการสินค้าทั้งหมด",
          priority: "med",
          steps: "1. เข้าเมนูจัดการสินค้า",
          expected:
            "แสดงรายการสินค้าทั้งหมดพร้อมสถานะ ราคา และสต็อกคงเหลือถูกต้องครบถ้วน",
        },
      ],
    },
    {
      id: "adm-category",
      name: "2.2 การจัดการหมวดหมู่สินค้า (Admin)",
      tag: "ADMIN",
      cases: [
        {
          id: "ADM-CAT-01",
          title: "เพิ่มหมวดหมู่สินค้า",
          priority: "med",
          steps:
            "1. เข้าเมนูจัดการหมวดหมู่\n2. กรอกชื่อหมวดหมู่ใหม่\n3. บันทึก",
          expected:
            "หมวดหมู่ใหม่ถูกบันทึกและสามารถเลือกใช้งานตอนเพิ่ม/แก้ไขสินค้าได้",
        },
        {
          id: "ADM-CAT-02",
          title: "แก้ไขหมวดหมู่สินค้า",
          priority: "med",
          steps: "1. เลือกหมวดหมู่ที่ต้องการแก้ไข\n2. แก้ไขชื่อและบันทึก",
          expected:
            "ชื่อหมวดหมู่อัปเดตถูกต้อง และสินค้าที่ผูกกับหมวดหมู่นี้ยังคงแสดงถูกต้อง",
        },
        {
          id: "ADM-CAT-03",
          title: "ลบหมวดหมู่สินค้า",
          priority: "low",
          steps:
            "1. เลือกหมวดหมู่ที่ต้องการลบ\n2. ยืนยันการลบ (โดยเฉพาะกรณีมีสินค้าผูกอยู่)",
          expected:
            "ระบบแจ้งเตือนหากมีสินค้าผูกอยู่กับหมวดหมู่ก่อนลบ ป้องกันข้อมูลสินค้าสูญหายการอ้างอิง",
        },
        {
          id: "ADM-CAT-04",
          title: "ดูรายการหมวดหมู่สินค้า",
          priority: "low",
          steps: "1. เข้าเมนูจัดการหมวดหมู่",
          expected:
            "แสดงรายการหมวดหมู่ทั้งหมดพร้อมจำนวนสินค้าที่อยู่ในแต่ละหมวดหมู่",
        },
        {
          id: "ADM-CAT-05",
          title: "เพิ่มหมวดหมู่ด้วยชื่อที่ซ้ำกับที่มีอยู่แล้ว",
          priority: "med",
          steps:
            "1. เข้าเมนูจัดการหมวดหมู่\n2. กรอกชื่อหมวดหมู่ที่มีอยู่แล้วในระบบ (เช่น ชื่อเดียวกับหมวดหมู่ที่มีอยู่)\n3. กดบันทึก",
          expected:
            "ระบบแสดงข้อความแจ้งเตือนชัดเจนว่า 'ชื่อหมวดหมู่นี้มีอยู่แล้ว กรุณาใช้ชื่ออื่น' ไม่ใช่ข้อความ Server Error ทั่วไป และไม่มีการสร้างหมวดหมู่ซ้ำเกิดขึ้น",
        },
      ],
    },
    {
      id: "adm-order",
      name: "2.3 การจัดการคำสั่งซื้อ (Admin)",
      tag: "ADMIN",
      cases: [
        {
          id: "ADM-ORD-01",
          title: "ตรวจสอบรายการคำสั่งซื้อของลูกค้า",
          priority: "high",
          steps: "1. เข้าเมนูจัดการคำสั่งซื้อ\n2. ดู/กรองรายการคำสั่งซื้อ",
          expected:
            "แสดงรายการคำสั่งซื้อทั้งหมดพร้อมสถานะและข้อมูลลูกค้าถูกต้องครบถ้วน",
        },
        {
          id: "ADM-ORD-02",
          title: "อัปเดตสถานะคำสั่งซื้อตามลำดับที่ถูกต้อง",
          priority: "high",
          steps:
            "1. เลือกคำสั่งซื้อที่สถานะ 'ชำระเงินแล้ว'\n2. เปลี่ยนสถานะเป็น 'กำลังจัดส่ง' แล้วเป็น 'สำเร็จ' ตามลำดับ",
          expected:
            "สถานะเปลี่ยนถูกต้องตามลำดับ และลูกค้าเห็นสถานะที่อัปเดตทันที",
        },
        {
          id: "ADM-ORD-03",
          title: "ระบบต้องปฏิเสธการเปลี่ยนสถานะที่ข้ามลำดับหรือย้อนกลับ",
          priority: "high",
          steps:
            "1. เลือกคำสั่งซื้อที่สถานะ 'รอดำเนินการ'\n2. ตรวจสอบตัวเลือกในการเปลี่ยนสถานะที่ปรากฏ\n3. ลองเลือกคำสั่งซื้อที่ 'สำเร็จ' หรือ 'ยกเลิก' แล้วดูว่าเปลี่ยนสถานะต่อได้หรือไม่",
          expected:
            "คำสั่งซื้อสถานะ 'รอดำเนินการ' ต้องมีตัวเลือกให้เปลี่ยนได้แค่ 'ยกเลิก' เท่านั้น ส่วนคำสั่งซื้อที่ 'สำเร็จ' หรือ 'ยกเลิก' แล้วต้องไม่สามารถเปลี่ยนสถานะต่อได้อีก (เป็นสถานะสิ้นสุด)",
        },
        {
          id: "ADM-ORD-04",
          title: "Admin ไม่สามารถเปลี่ยนสถานะเป็น 'ชำระเงินแล้ว' ได้เอง",
          priority: "high",
          steps:
            "1. เลือกคำสั่งซื้อที่สถานะ 'รอดำเนินการ'\n2. พยายามเปลี่ยนสถานะเป็น 'ชำระเงินแล้ว' โดยตรงผ่านหน้า Admin",
          expected:
            "ระบบต้องปฏิเสธการเปลี่ยนสถานะนี้ พร้อมข้อความแจ้งเตือน เพราะสถานะ 'ชำระเงินแล้ว' ต้องเกิดจากการชำระเงินจริงของลูกค้าเท่านั้น ไม่ใช่ Admin กำหนดเอง",
        },
        {
          id: "ADM-ORD-05",
          title: "ยกเลิกคำสั่งซื้อที่ชำระเงินแล้ว ต้องคืนสต็อกสินค้ากลับ",
          priority: "high",
          steps:
            "1. เลือกคำสั่งซื้อที่สถานะ 'ชำระเงินแล้ว' หรือ 'กำลังจัดส่ง'\n2. บันทึกจำนวนสต็อกสินค้าปัจจุบันไว้ก่อน\n3. เปลี่ยนสถานะเป็น 'ยกเลิก'\n4. ตรวจสอบจำนวนสต็อกสินค้าอีกครั้ง",
          expected:
            "สต็อกสินค้าต้องเพิ่มกลับคืนตามจำนวนที่เคยสั่งซื้อในคำสั่งซื้อนั้น",
        },
        {
          id: "ADM-ORD-07",
          title: "ติดตามความคืบหน้าของคำสั่งซื้อ",
          priority: "med",
          steps: "1. เลือกคำสั่งซื้อ\n2. ตรวจสอบไทม์ไลน์/ประวัติสถานะ",
          expected:
            "แสดงประวัติการเปลี่ยนสถานะของคำสั่งซื้อเรียงตามเวลาได้ถูกต้อง",
        },
      ],
    },
    {
      id: "adm-report",
      name: "2.4 การดูรายงานและ Dashboard (Admin)",
      tag: "ADMIN",
      cases: [
        {
          id: "ADM-RPT-01",
          title: "ดูรายงานสรุปข้อมูลการขายเบื้องต้น",
          priority: "high",
          steps: "1. เข้าเมนูรายงานยอดขาย",
          expected:
            "แสดงยอดขายรวม จำนวนคำสั่งซื้อ และข้อมูลสรุปอื่น ๆ ตรงกับข้อมูลจริงในระบบ",
        },
        {
          id: "ADM-RPT-02",
          title: "ดู Dashboard แสดงข้อมูลสถิติของระบบ",
          priority: "med",
          steps:
            "1. เข้าหน้า Dashboard ผู้ดูแลระบบ\n2. เพิ่ม/แก้ไขข้อมูลสินค้าหรือคำสั่งซื้อ แล้วกลับมาดู Dashboard อีกครั้ง",
          expected:
            "กราฟ/ตัวเลขสถิติที่แสดงต้องสอดคล้องกับข้อมูลจริงในระบบ และเปลี่ยนแปลงตามข้อมูลที่อัปเดตล่าสุด (หมายเหตุ: หากตัวเลขไม่ขยับตามข้อมูลจริง ให้บันทึกเป็น Issue ทันที)",
        },
      ],
    },
    {
      id: "adm-customer",
      name: "2.5 การจัดการข้อมูลลูกค้า (Admin)",
      tag: "ADMIN",
      cases: [
        {
          id: "ADM-CUS-01",
          title: "ค้นหาข้อมูลลูกค้า",
          priority: "med",
          steps: "1. เข้าเมนูจัดการลูกค้า\n2. ค้นหาด้วยชื่อ/อีเมล/เบอร์โทร",
          expected: "ผลการค้นหาตรงกับคำค้นและแสดงข้อมูลลูกค้าที่ถูกต้อง",
        },
        {
          id: "ADM-CUS-02",
          title: "ดูรายละเอียดข้อมูลลูกค้า",
          priority: "med",
          steps: "1. เลือกลูกค้าจากรายการ",
          expected:
            "แสดงข้อมูลลูกค้า ประวัติการสั่งซื้อ และที่อยู่จัดส่งครบถ้วนถูกต้อง",
        },
      ],
    },
    {
      id: "sup-account",
      name: "3.0 การเข้าสู่ระบบ (Super Admin)",
      tag: "SUPER ADMIN",
      cases: [
        {
          id: "SUP-ACC-01",
          title: "เข้าสู่ระบบด้วยบัญชี Super Admin",
          priority: "high",
          steps:
            "1. กรอกอีเมล/รหัสผ่านของบัญชี Super Admin ในฟอร์ม Login เดียวกับผู้ใช้ทั่วไป\n2. กดเข้าสู่ระบบ",
          expected:
            "เข้าสู่ระบบสำเร็จ เห็นเมนู 'Admin Console' ใน Dropdown บัญชีเหมือน Admin ทั่วไป",
        },
      ],
    },
    {
      id: "sup-member",
      name: "3.1 การจัดการข้อมูลผู้ดูแลระบบ (Super Admin)",
      tag: "SUPER ADMIN",
      cases: [
        {
          id: "SUP-MEM-02",
          title: "สามารถเข้าถึงฟังก์ชันทั้งหมดของผู้ดูแลระบบได้",
          priority: "high",
          steps:
            "1. เข้าสู่ระบบด้วยบัญชี Super Admin\n2. ตรวจสอบเมนูและฟังก์ชันที่สามารถเข้าถึงได้",
          expected:
            "Super Admin สามารถเข้าถึงและใช้งานฟังก์ชันทั้งหมดของระบบได้โดยไม่มีข้อจำกัดใด ๆ",
        },
        {
          id: "SUP-MEM-03",
          title: "สร้างผู้ดูแลระบบใหม่",
          priority: "high",
          steps:
            "1. เข้าเมนูจัดการแอดมิน\n2. กดเพิ่มแอดมิน\n3. กรอกข้อมูลและกำหนดบทบาทเป็น Admin\n4. บันทึก",
          expected:
            "แอดมินใหม่ถูกสร้างและสามารถเข้าสู่ระบบด้วยบัญชีที่สร้างได้สำเร็จ",
        },
        {
          id: "SUP-MEM-04",
          title: "แก้ไขข้อมูลผู้ดูแลระบบ",
          priority: "med",
          steps: "1. เลือกแอดมินที่ต้องการแก้ไข\n2. แก้ไขข้อมูลและบันทึก",
          expected: "ข้อมูลแอดมินอัปเดตถูกต้องตามที่แก้ไข",
        },
        {
          id: "SUP-MEM-05",
          title: "ลบข้อมูลผู้ดูแลระบบ",
          priority: "med",
          steps: "1. เลือกแอดมินที่ต้องการลบ\n2. ยืนยันการลบ",
          expected: "แอดมินถูกลบ/ปิดการใช้งาน และไม่สามารถเข้าสู่ระบบได้อีก",
        },
        {
          id: "SUP-MEM-06",
          title: "ดูรายการแอดมินทั้งหมด",
          priority: "low",
          steps: "1. เข้าเมนูจัดการแอดมิน",
          expected:
            "แสดงรายการแอดมินทั้งหมดในระบบพร้อมสถานะและบทบาทถูกต้องครบถ้วน",
        },
      ],
    },
    {
      id: "sup-permission",
      name: "3.2 การจัดการสิทธิ์การใช้งาน (Super Admin)",
      tag: "SUPER ADMIN",
      cases: [
        {
          id: "SUP-PER-01",
          title: "กำหนดสิทธิ์การใช้งานของผู้ดูแลระบบ (Admin)",
          priority: "high",
          steps: "1. เลือกบัญชี Admin\n2. กำหนด/ปรับสิทธิ์การเข้าถึงเมนูต่าง ๆ",
          expected:
            "Admin สามารถเข้าถึงได้เฉพาะฟังก์ชันที่ได้รับสิทธิ์เท่านั้น เมนูที่ไม่มีสิทธิ์ต้องถูกซ่อนหรือบล็อก",
        },
      ],
    },
  ],
};

// ---------- STATE ----------
const state = {}; // caseId -> {status, note, issueType, severity}
const ISSUE_TYPES = [
  "ระบบทำงานไม่ตรงตามความต้องการ",
  "ปัญหาด้านประสิทธิภาพ",
  "ปัญหาเกี่ยวกับข้อมูล",
  "ปัญหาด้าน UI/UX",
  "อื่นๆ",
];
const SEVERITIES = ["Critical", "High", "Medium", "Low"];
function defaultSeverity(priority) {
  return priority === "high" ? "High" : priority === "med" ? "Medium" : "Low";
}
uatData.modules.forEach((m) =>
  m.cases.forEach(
    (c) =>
    (state[c.id] = {
      status: "pending",
      note: "",
      issueType: ISSUE_TYPES[0],
      severity: defaultSeverity(c.priority),
    }),
  ),
);
let activeFilter = "all";
let issueCounter = 0;

// ---------- RENDER ----------
const modulesEl = document.getElementById("modules");
const filterBar = document.getElementById("filter-bar");

function renderFilterBar() {
  filterBar.innerHTML = "";
  const allBtn = document.createElement("button");
  allBtn.className = "filter-btn active";
  allBtn.textContent = "ทั้งหมด";
  allBtn.dataset.f = "all";
  filterBar.appendChild(allBtn);
  uatData.modules.forEach((m) => {
    const b = document.createElement("button");
    b.className = "filter-btn";
    b.textContent = m.name.split(" (")[0];
    b.dataset.f = m.id;
    filterBar.appendChild(b);
  });
  const spacer = document.createElement("div");
  spacer.className = "spacer";
  filterBar.appendChild(spacer);

  const resetBtn = document.createElement("button");
  resetBtn.className = "icon-btn ghost";
  resetBtn.textContent = "รีเซ็ตทั้งหมด";
  resetBtn.onclick = () => {
    if (confirm("ล้างผลการทดสอบทั้งหมด?")) {
      uatData.modules.forEach((m) =>
        m.cases.forEach((c) => {
          state[c.id] = {
            status: "pending",
            note: "",
            issueType: ISSUE_TYPES[0],
            severity: defaultSeverity(c.priority),
          };
        }),
      );
      sync();
      saveState();
    }
  };
  filterBar.appendChild(resetBtn);

  const exportBtn = document.createElement("button");
  exportBtn.className = "icon-btn";
  exportBtn.textContent = "⬇ ส่งออก JSON";
  exportBtn.onclick = exportResults;
  filterBar.appendChild(exportBtn);

  const printBtn = document.createElement("button");
  printBtn.className = "icon-btn ghost";
  printBtn.textContent = "🖨 พิมพ์";
  printBtn.onclick = () => window.print();
  filterBar.appendChild(printBtn);

  filterBar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.f;
      filterBar
        .querySelectorAll(".filter-btn")
        .forEach((x) => x.classList.remove("active"));
      btn.classList.add("active");
      renderModules();
    });
  });
}

function prioLabel(p) {
  return p === "high" ? "สำคัญมาก" : p === "med" ? "ปานกลาง" : "ต่ำ";
}

function renderModules() {
  modulesEl.innerHTML = "";
  uatData.modules.forEach((mod) => {
    if (activeFilter !== "all" && activeFilter !== mod.id) return;

    const group = document.createElement("div");
    group.className = "module-group";

    const head = document.createElement("div");
    head.className = "module-head";
    head.innerHTML = `<span class="module-tag">${mod.tag}</span>
      <h2 class="module-title">${mod.name}</h2>
      <span class="module-count">${mod.cases.length} test cases</span>`;
    group.appendChild(head);

    mod.cases.forEach((c) => {
      const st = state[c.id];
      const card = document.createElement("div");
      card.className = "case" + (st.status !== "pending" ? " done" : "");

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = st.status === "pass";
      cb.addEventListener("change", () => {
        st.status = cb.checked ? "pass" : "pending";
        sync();
        saveState();
      });

      const body = document.createElement("div");
      body.innerHTML = `
        <div class="case-id">${c.id} <span class="prio ${c.priority}">${prioLabel(c.priority)}</span></div>
        <div class="case-title">${c.title}</div>
        <div class="case-steps">${c.steps}</div>
        <div class="case-expect"><strong>ผลลัพธ์ที่คาดหวัง:</strong> ${c.expected}</div>
      `;

      const statusCol = document.createElement("div");
      statusCol.className = "status-col";

      const sel = document.createElement("select");
      sel.className = "status-select " + st.status;
      sel.innerHTML = `
        <option value="pending" ${st.status === "pending" ? "selected" : ""}>⏳ ยังไม่ทดสอบ</option>
        <option value="pass" ${st.status === "pass" ? "selected" : ""}>✅ ผ่าน</option>
        <option value="fail" ${st.status === "fail" ? "selected" : ""}>❌ ไม่ผ่าน</option>
      `;
      sel.addEventListener("change", () => {
        st.status = sel.value;
        sel.className = "status-select " + st.status;
        cb.checked = st.status === "pass";
        sync();
        saveState();
      });

      const note = document.createElement("textarea");
      note.className = "note";
      note.placeholder = "บันทึกผล/บั๊กที่พบ...";
      note.value = st.note;
      note.addEventListener("input", () => {
        st.note = note.value;
        updateIssueTable();
        saveState(true);
      });

      statusCol.appendChild(sel);
      statusCol.appendChild(note);

      if (st.status === "fail") {
        const issueFields = document.createElement("div");
        issueFields.className = "issue-fields";

        const typeSel = document.createElement("select");
        typeSel.innerHTML = ISSUE_TYPES.map(
          (t) =>
            `<option value="${t}" ${st.issueType === t ? "selected" : ""}>${t}</option>`,
        ).join("");
        typeSel.addEventListener("change", () => {
          st.issueType = typeSel.value;
          updateIssueTable();
          saveState();
        });

        const sevSel = document.createElement("select");
        sevSel.innerHTML = SEVERITIES.map(
          (s) =>
            `<option value="${s}" ${st.severity === s ? "selected" : ""}>${s}</option>`,
        ).join("");
        sevSel.addEventListener("change", () => {
          st.severity = sevSel.value;
          updateIssueTable();
          saveState();
        });

        issueFields.appendChild(typeSel);
        issueFields.appendChild(sevSel);
        statusCol.appendChild(issueFields);
      }

      card.appendChild(cb);
      card.appendChild(body);
      card.appendChild(statusCol);
      group.appendChild(card);
    });

    modulesEl.appendChild(group);
  });
}

function sync() {
  renderModules();
  updateStats();
  updateIssueTable();
}

function updateStats() {
  const all = Object.values(state);
  const total = all.length;
  const pass = all.filter((s) => s.status === "pass").length;
  const fail = all.filter((s) => s.status === "fail").length;
  const tested = pass + fail;
  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-pass").textContent = pass;
  document.getElementById("stat-fail").textContent = fail;
  const passPct = total ? Math.round((pass / total) * 100) : 0;
  document.getElementById("stat-pct").textContent = passPct + "%";
  const pct = total ? Math.round((tested / total) * 100) : 0;
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-text").textContent =
    `${tested} / ${total} ทดสอบแล้ว (${pct}%) · ผ่าน ${pass}/${total} (${passPct}%)`;
}

function sevRank(s) {
  return { Critical: 0, High: 1, Medium: 2, Low: 3 }[s] ?? 9;
}

function updateIssueTable() {
  const wrap = document.getElementById("issue-table-wrap");
  const refsEl = document.getElementById("issue-refs");
  const verdictEl = document.getElementById("verdict-text");

  const failed = [];
  uatData.modules.forEach((m) => {
    m.cases.forEach((c) => {
      const st = state[c.id];
      if (st.status === "fail") failed.push({ case: c, module: m, st });
    });
  });

  failed.sort((a, b) => sevRank(a.st.severity) - sevRank(b.st.severity));

  if (failed.length === 0) {
    wrap.innerHTML = `<div class="issue-empty">ยังไม่พบปัญหา — เมื่อทำเครื่องหมาย test case ใดว่า "ไม่ผ่าน" ระบบจะสรุปมาไว้ในตารางนี้โดยอัตโนมัติ</div>`;
    refsEl.textContent = "";
  } else {
    const rows = failed
      .map((f, idx) => {
        const issId = "ISS-" + String(idx + 1).padStart(3, "0");
        const detail =
          f.st.note && f.st.note.trim() ? f.st.note.trim() : f.case.title;
        return `<tr>
        <td class="iss-id">${issId}</td>
        <td>${detail}<br><span style="color:var(--muted); font-size:11px;">อ้างอิง ${f.case.id} — ${f.module.name.split(" (")[0]}</span></td>
        <td>${f.st.issueType}</td>
        <td><span class="sev ${f.st.severity}">${f.st.severity}</span></td>
      </tr>`;
      })
      .join("");

    wrap.innerHTML = `
      <table class="issue-table">
        <thead>
          <tr><th>Issue ID</th><th>รายละเอียดปัญหา</th><th>ประเภทปัญหา</th><th>ระดับความสำคัญ</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;

    refsEl.innerHTML = `<strong>อ้างอิงจากผลการทดสอบ:</strong> ${failed.map((f) => f.case.id).join(", ")}`;
  }

  const all = Object.values(state);
  const total = all.length;
  const pass = all.filter((s) => s.status === "pass").length;
  const criticalOrHigh = failed.filter(
    (f) => f.st.severity === "Critical" || f.st.severity === "High",
  );
  const affectedModules = [
    ...new Set(criticalOrHigh.map((f) => f.module.name.split(" (")[0])),
  ];

  let verdict;
  if (total === 0) {
    verdict = "ยังไม่มี test case ในระบบ";
  } else if (failed.length === 0 && pass === total) {
    verdict = `Test Case ผ่านการทดสอบครบทั้ง ${total} รายการ ไม่พบปัญหาที่ต้องแก้ไข ระบบมีความพร้อมสำหรับการส่งมอบหรือเผยแพร่ใช้งานจริง`;
  } else if (failed.length === 0) {
    verdict = `มี Test Case ผ่านการทดสอบแล้ว ${pass} จาก ${total} รายการ และยังไม่พบปัญหาในรายการที่ทดสอบจนถึงขณะนี้ ควรทดสอบส่วนที่เหลือให้ครบก่อนสรุปผล`;
  } else {
    const moduleText = affectedModules.length
      ? `ได้แก่ ${affectedModules.join(", ")}`
      : "ในบางฟังก์ชันของระบบ";
    verdict = `เนื่องจากมี Test Case ผ่านการทดสอบเพียง ${pass} จาก ${total} รายการ และพบปัญหาระดับ Critical/High ${moduleText} จึงควรดำเนินการแก้ไข Issue ที่พบทั้งหมดก่อนการส่งมอบหรือเผยแพร่ระบบใช้งานจริง`;
  }
  verdictEl.innerHTML = `<span class="verdict-strong">${verdict}</span>`;
}

function exportResults() {
  const result = uatData.modules.map((m) => ({
    module: m.name,
    cases: m.cases.map((c) => ({
      id: c.id,
      title: c.title,
      priority: c.priority,
      status: state[c.id].status,
      note: state[c.id].note,
      issueType:
        state[c.id].status === "fail" ? state[c.id].issueType : undefined,
      severity:
        state[c.id].status === "fail" ? state[c.id].severity : undefined,
    })),
  }));
  const issues = [];
  uatData.modules.forEach((m) =>
    m.cases.forEach((c) => {
      const st = state[c.id];
      if (st.status === "fail") {
        issues.push({
          detail: st.note && st.note.trim() ? st.note.trim() : c.title,
          type: st.issueType,
          severity: st.severity,
          refCase: c.id,
          module: m.name,
        });
      }
    }),
  );
  const blob = new Blob(
    [
      JSON.stringify(
        {
          exported_at: new Date().toISOString(),
          results: result,
          issue_log: issues,
        },
        null,
        2,
      ),
    ],
    { type: "application/json" },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "uat_results.json";
  a.click();
  URL.revokeObjectURL(url);
}

// ---------- PERSISTENCE (localStorage) ----------

let saveTimer = null;
let storageAvailable = true;

function setSaveStatus(mode) {
  const el = document.getElementById("save-status");
  if (!el) return;
  el.className = "save-status " + mode;
  el.textContent =
    mode === "saving"
      ? "⏳ กำลังบันทึก..."
      : mode === "saved"
        ? "✓ บันทึกแล้ว"
        : mode === "error"
          ? "⚠ เบราว์เซอร์บล็อกการบันทึก (ใช้ปุ่มส่งออก JSON แทน)"
          : mode === "loading"
            ? "⏳ กำลังโหลด..."
            : "";
}

async function loadSavedState() {
  setSaveStatus("loading");

  try {
    const snap = await getDoc(doc(db, "uat", "checklist"));

    if (snap.exists()) {
      const saved = snap.data().state || {};

      Object.keys(saved).forEach((id) => {
        if (state[id]) {
          state[id] = {
            ...state[id],
            ...saved[id],
          };
        }
      });

      setSaveStatus("saved");
    } else {
      setSaveStatus("");
    }
  } catch (err) {
    console.error(err);
    setSaveStatus("error");
  }
}

async function saveState(debounced = false) {
  console.log("saveState called");
  clearTimeout(saveTimer);

  const delay = debounced ? 600 : 0;

  setSaveStatus("saving");
  console.log("Saving...");
  saveTimer = setTimeout(async () => {
    try {
      console.log("Saving...");

      await setDoc(
        doc(db, "uat", "checklist"),
        {
          state,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );

      console.log("Saved OK");

      setSaveStatus("saved");
    } catch (err) {
      console.error("Firestore Error:", err);
      alert(err.message);
      setSaveStatus("error");
    }
  }, delay);
}

async function init() {
  await loadSavedState();

  renderFilterBar();
  renderModules();
  updateStats();
  updateIssueTable();
}

init();
