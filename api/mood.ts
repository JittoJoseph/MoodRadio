// api/mood.ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}

	const { image } = req.body
	const apiKey = process.env.GEMINI_API_KEY

	if (!apiKey) {
		return res.status(500).json({ error: 'GEMINI_API_KEY is not set' })
	}

	try {
		// Replace with the actual API endpoint and request parameters
		const response = await axios.post(
			'https://gemini.googleapis.com/v1beta/mood:analyze',
			{ image },
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiKey}`,
				},
			}
		)

		const moodAnalysis = response.data
		res.status(200).json(moodAnalysis)
	} catch (error) {
		console.error('Mood detection failed', error)
		res.status(500).json({ error: 'Mood detection failed' })
	}
}