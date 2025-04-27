import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export async function generateMedicineInfo(medicineName: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.o",
    messages: [{
      role: "user",
      content: `Provide homeopathic medicine details for "${medicineName}" in JSON format with: description, dosage, ingredients, usage, precautions. Be concise but informative.`
    }],
    response_format: { type: "json_object" }
  })

  return JSON.parse(response.choices[0]?.message?.content || '{}')
}