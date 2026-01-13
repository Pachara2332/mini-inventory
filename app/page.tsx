
import { prisma } from '@/app/lib/prisma'
import { deleteProduct } from '@/app/actions/productActions'
import AddProductForm from './components/AddProductForm'

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            📦 Mini Inventory
          </h1>
          <p className="text-gray-500">ระบบจัดการสินค้าคงคลังอย่างง่าย</p>
        </header>

        <AddProductForm />

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800">รายการสินค้าทั้งหมด ({products.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-medium">ชื่อสินค้า</th>
                  <th className="p-4 font-medium text-right">ราคา</th>
                  <th className="p-4 font-medium text-center">คงเหลือ</th>
                  <th className="p-4 font-medium text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4 font-medium text-gray-900">{product.name}</td>
                    <td className="p-4 text-right tabular-nums text-gray-600">
                      {product.price.toLocaleString()} <span className="text-xs text-gray-400">บาท</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${product.quantity === 0
                          ? 'bg-red-100 text-red-800'
                          : product.quantity < 5
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                        {product.quantity} ชิ้น
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <form action={async () => {
                        'use server'
                        await deleteProduct(product.id)
                      }}>
                        <button className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all group-hover:opacity-100 opacity-60">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-4xl">📭</span>
                        <p>ยังไม่มีสินค้าในสต็อก</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}