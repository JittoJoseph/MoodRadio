// src/services/youtubeService.ts
import axios from 'axios'

export const getPlaylist = async (mood: string): Promise<any[]> => {
	try {
		const response = await axios.get('/api/music', {
			params: { moodId: mood },
		})
		return response.data.songs
	} catch (error) {
		console.error('Failed to fetch playlist', error)
		return []
	}
}