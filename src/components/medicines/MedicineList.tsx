'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function MedicineList({ medicines }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Search medicines..."
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMedicines.map(medicine => (
          <Link
            key={medicine.id}
            href={`/medicines/${medicine.id}`}
            className="border p-4 rounded-lg hover:shadow-md transition-shadow"
          >
            <h2 className="font-semibold">{medicine.name}</h2>
            <p className="text-sm text-gray-600">
              Expires: {new Date(medicine.expiry_date).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}