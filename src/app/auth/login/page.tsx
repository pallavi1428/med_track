import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (!error) redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form action={handleLogin} className="space-y-4 w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Medicine Tracker Login</h1>
        <div>
          <label className="block mb-1">Email</label>
          <input name="email" type="email" required className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input name="password" type="password" required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  )
}