import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export type MedicineInfo = {
  description: string
  dosage: string
  ingredients: string
  usage: string
  precautions?: string
}

export async function generateMedicineInfo(name: string): Promise<MedicineInfo> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `Provide homeopathic medicine details for "${name}" in JSON format with: description, dosage, ingredients, usage, precautions. Be concise but informative.`
    }],
    response_format: { type: "json_object" }
  })

  return JSON.parse(response.choices[0]?.message?.content || '{}')
}