'use client'

import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type FormData = {
  name: string
  purchaseDate: string
  expiryDate: string
  image?: FileList
}

export default function AddMedicine({ userId }: { userId: string }) {
  const router = useRouter()
  const { register, handleSubmit, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    let imageUrl: string | undefined
    
    if (data.image?.[0]) {
      const file = data.image[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${crypto.randomUUID()}.${fileExt}`
      
      const { data: uploadData } = await supabase.storage
        .from('medicine-images')
        .upload(fileName, file)
      
      imageUrl = uploadData?.path
    }

    await supabase.from('medicines').insert({
      name: data.name,
      purchase_date: data.purchaseDate,
      expiry_date: data.expiryDate,
      image_url: imageUrl,
      user_id: userId
    })

    reset()
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4">
      <input {...register('name')} placeholder="Medicine Name" required />
      <input type="date" {...register('purchaseDate')} required />
      <input type="date" {...register('expiryDate')} required />
      <input type="file" {...register('image')} accept="image/*" />
      <button type="submit">Add Medicine</button>
    </form>
  )
}