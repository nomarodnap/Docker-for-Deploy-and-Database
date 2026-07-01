import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

export const dynamic = 'force-dynamic'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default async function UsersPage() {
  const users = await prisma.user.findMany()

  async function addUser(formData: FormData) {
    'use server'
    const name = formData.get('name') as string
    const email = formData.get('email') as string

    if (name && email) {
      await prisma.user.create({
        data: { name, email }
      })
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ระบบจัดการผู้ใช้งาน (Docker + Next.js + Prisma)</h1>
      
      <form action={addUser} className="mb-6 flex gap-2">
        <input type="text" name="name" placeholder="ชื่อ" className="border p-2 rounded text-black" required />
        <input type="email" name="email" placeholder="อีเมล" className="border p-2 rounded text-black" required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">เพิ่มผู้ใช้งาน</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">รายชื่อในฐานข้อมูล:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border-b py-2">
            {user.name} ({user.email}) - {user.createdAt.toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  )
}