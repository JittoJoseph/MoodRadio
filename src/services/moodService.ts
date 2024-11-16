// src/services/moodService.ts
import axios from 'axios'

export const analyzeMood = async (image: string): Promise<string> => {
	try {
		const response = await axios.post('/api/mood', { image })
		return response.data.mood
	} catch (error) {
		console.error('Mood detection failed', error)
		return 'neutral' // Fallback mood
	}
}