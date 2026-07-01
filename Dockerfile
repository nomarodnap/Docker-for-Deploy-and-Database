# ใช้ Node.js เวอร์ชัน 18 เป็นฐาน
FROM node:22-alpine

# กำหนดโฟลเดอร์ทำงานใน Container
WORKDIR /app

# ก๊อปปี้ไฟล์จัดการแพ็กเกจและโฟลเดอร์ Prisma เข้าไปก่อน
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# ติดตั้ง Library ทั้งหมด
RUN npm install

# ก๊อปปี้โค้ดทั้งหมดในโปรเจกต์ตามเข้าไป
COPY . .

# สร้าง Prisma Client เพื่อเตรียมต่อฐานข้อมูล
RUN npx prisma generate

# Build โปรเจกต์ Next.js ให้พร้อมใช้งาน (Production)
RUN npm run build

# เปิด Port 3000 ให้ภายนอกเข้ามาได้
EXPOSE 3000

# คำสั่งสุดท้ายสำหรับรันเซิร์ฟเวอร์เมื่อ Container เริ่มทำงาน
CMD ["npm", "start"]