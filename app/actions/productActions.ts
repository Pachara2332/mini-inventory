// src/actions/productActions.ts
'use server' // บรรทัดนี้บอก Next.js ว่า "โค้ดนี้รันบน Server เท่านั้นนะ"

import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'

  // ฟังก์ชันเพิ่มสินค้า (Create)
export async function addProduct(formData: FormData) {
  const name = formData.get('name') as string
  const price = Number(formData.get('price'))
  const quantity = Number(formData.get('quantity'))

  if (!name || isNaN(price) || isNaN(quantity)) {
    return { success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' }
  }

  try {
    await prisma.product.create({
      data: {
        name,
        price,
        quantity,
      },
    })
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Add product error:', error)
    return { success: false, message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า' }
  }
}

// ฟังก์ชันลบสินค้า (Delete)
export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: { id },
  })
  revalidatePath('/')
}