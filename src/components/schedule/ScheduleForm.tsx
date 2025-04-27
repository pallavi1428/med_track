'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'

export default function ScheduleForm({ medicineId }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, watch } = useForm()
  const scheduleType = watch('scheduleType')

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      await supabase.from('schedules').insert({
        medicine_id: medicineId,
        user_id: user.id,
        time: data.time,
        days: scheduleType === 'daily' ? ['daily'] : data.days.split(','),
        start_date: data.startDate,
        end_date: data.endDate || null
      })
      
      alert('Schedule created successfully!')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Create Schedule</h2>
      
      <div>
        <label>Schedule Type</label>
        <select {...register('scheduleType')} className="w-full p-2 border rounded">
          <option value="daily">Daily</option>
          <option value="weekly">Specific Days</option>
        </select>
      </div>
      
      <div>
        <label>Time</label>
        <input
          type="time"
          {...register('time', { required: true })}
          className="w-full p-2 border rounded"
        />
      </div>
      
      {scheduleType === 'weekly' && (
        <div>
          <label>Days (comma separated, e.g. Mon,Wed,Fri)</label>
          <input
            {...register('days', { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Start Date</label>
          <input
            type="date"
            {...register('startDate', { required: true })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>End Date (optional)</label>
          <input
            type="date"
            {...register('endDate')}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSubmitting ? 'Saving...' : 'Save Schedule'}
      </button>
    </form>
  )
}