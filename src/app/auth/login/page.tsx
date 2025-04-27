import { supabase } from '@/lib/supabase'
import MedicineList from '@/components/MedicineList'
import AddMedicine from '@/components/AddMedicine'
import { redirect } from 'next/navigation'

export default async function Home() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: medicines } = await supabase
    .from('medicines')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true })

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Medicines</h1>
      <AddMedicine />
      <MedicineList medicines={medicines || []} />
    </main>
  )
}