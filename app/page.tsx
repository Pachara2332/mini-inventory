
import { prisma } from '@/app/lib/db'
import { addProduct, deleteProduct } from '@/app/actions/productActions'

export default async function Home() {
  // 1. ดึงข้อมูลจาก DB (เขียนตรงนี้ได้เลย เพราะนี่คือ Server Component!)
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">📦 Mini Inventory</h1>

      {/* 2. ฟอร์มเพิ่มสินค้า (เชื่อมกับ Server Action) */}
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="font-semibold mb-4">เพิ่มสินค้าใหม่</h2>
        <form action={addProduct} className="flex gap-2 flex-wrap">
          <input 
            type="text" name="name" placeholder="ชื่อสินค้า" required 
            className="border p-2 rounded flex-grow text-black"
          />
          <input 
            type="number" name="price" placeholder="ราคา" required 
            className="border p-2 rounded w-24 text-black"
          />
          <input 
            type="number" name="quantity" placeholder="จำนวน" required 
            className="border p-2 rounded w-24 text-black"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            บันทึก
          </button>
        </form>
      </div>

      {/* 3. ตารางแสดงรายการสินค้า */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4">ชื่อสินค้า</th>
              <th className="p-4">ราคา</th>
              <th className="p-4">คงเหลือ</th>
              <th className="p-4">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.price} บาท</td>
                <td className="p-4">
                  <span className={product.quantity < 5 ? 'text-red-500 font-bold' : 'text-green-600'}>
                    {product.quantity} ชิ้น
                  </span>
                </td>
                <td className="p-4">
                  {/* ปุ่มลบสินค้า (ต้องห่อด้วย form เพื่อเรียก Server Action) */}
                  <form action={async () => {
                    'use server'
                    await deleteProduct(product.id)
                  }}>
                    <button className="text-red-500 hover:underline">ลบ</button>
                  </form>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  ยังไม่มีสินค้าในสต็อก
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}