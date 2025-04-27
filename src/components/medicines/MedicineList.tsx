'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Medicine } from '@/types'

export default function MedicineList({ medicines }: { medicines: Medicine[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search medicines..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {filteredMedicines.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No medicines found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMedicines.map((medicine) => (
            <Link
              key={medicine.id}
              href={`/medicines/${medicine.id}`}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              {medicine.image_url && (
                <img 
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/medicine-images/${medicine.image_url}`}
                  alt={medicine.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              <h2 className="font-semibold text-lg">{medicine.name}</h2>
              <p className="text-sm text-gray-600">
                Expires: {new Date(medicine.expiry_date).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}