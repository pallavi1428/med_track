import { supabase } from '@/lib/supabase'
import { generateMedicineInfo } from '@/lib/openai'
import ScheduleForm from '@/components/schedule/ScheduleForm'
import { redirect } from 'next/navigation'

export default async function MedicinePage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: medicine } = await supabase
    .from('medicines')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!medicine) return <div>Medicine not found</div>

  if (!medicine.description) {
    const aiInfo = await generateMedicineInfo(medicine.name)
    await supabase
      .from('medicines')
      .update(aiInfo)
      .eq('id', params.id)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">{medicine.name}</h1>
        {/* Add medicine details display here */}
        <ScheduleForm medicineId={params.id} userId={user.id} />
      </div>
    </div>
  )
}