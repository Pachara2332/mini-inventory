'use client'

import { useRef, useState, useTransition } from 'react'
import { addProduct } from '@/app/actions/productActions'

export default function AddProductForm() {
    const [isPending, startTransition] = useTransition()
    const formRef = useRef<HTMLFormElement>(null)
    const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null)

    const handleSubmit = async (formData: FormData) => {
        setMessage(null)
        startTransition(async () => {
            const result = await addProduct(formData)
            if (result.success) {
                formRef.current?.reset()
                setMessage({ success: true, text: 'เพิ่มสินค้าเรียบร้อยแล้ว!' })
                // Clear success message after 3 seconds
                setTimeout(() => setMessage(null), 3000)
            } else {
                setMessage({ success: false, text: result.message || 'เกิดข้อผิดพลาด' })
            }
        })
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <span>✨</span> เพิ่มสินค้าใหม่
            </h2>

            {message && (
                <div className={`p-3 rounded mb-4 text-sm ${message.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form
                ref={formRef}
                action={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อสินค้า</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="เช่น คีย์บอร์ดไร้สาย"
                        required
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ราคา</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="0.00"
                        required
                        min="0"
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">จำนวน</label>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="0"
                        required
                        min="0"
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800"
                    />
                </div>

                <div className="md:col-span-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`px-6 py-2 rounded-lg font-medium text-white transition-all shadow-sm
              ${isPending
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'
                            }`}
                    >
                        {isPending ? 'กำลังบันทึก...' : 'บันทึกสินค้า'}
                    </button>
                </div>
            </form>
        </div>
    )
}
