// src/actions/productActions.ts
'use server' // บรรทัดนี้บอก Next.js ว่า "โค้ดนี้รันบน Server เท่านั้นนะ"

import { prisma } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'

// ฟังก์ชันเพิ่มสินค้า (Create)
export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string
  const price = Number(formData.get('price'))
  const quantity = Number(formData.get('quantity'))

  await prisma.product.create({
    data: {
      name,
      price,
      quantity,
    },
  })

  // สั่งให้หน้าเว็บรีเฟรชข้อมูลใหม่ทันที
  revalidatePath('/')
}

// ฟังก์ชันลบสินค้า (Delete)
export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: { id },
  })
  revalidatePath('/')
}