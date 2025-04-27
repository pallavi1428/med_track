'use client'

import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddMedicine() {
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    const { data: { user } } = await supabase.auth.getUser()
    
    await supabase.from('medicines').insert({
      name: data.name,
      purchase_date: data.purchaseDate,
      expiry_date: data.expiryDate,
      user_id: user?.id
    })
    
    reset()
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
      <h2 className="text-xl font-semibold">Add New Medicine</h2>
      <div>
        <input
          {...register('name', { required: true })}
          placeholder="Medicine Name"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          {...register('purchaseDate', { required: true })}
          className="p-2 border rounded"
        />
        <input
          type="date"
          {...register('expiryDate', { required: true })}
          className="p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Add Medicine
      </button>
    </form>
  )
}