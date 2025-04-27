import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import MedicineList from '@/components/medicines/MedicineList'
import AddMedicine from '@/components/medicines/AddMedicine'

export default async function Home() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: medicines } = await supabase
    .from('medicines')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Medicines</h1>
      <AddMedicine userId={user.id} />
      <MedicineList medicines={medicines || []} />
    </main>
  )
}