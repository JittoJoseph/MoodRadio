// src/services/youtubeService.ts
import axios from 'axios'

export interface Song {
	id: string
	title: string
	artist: string
	url: string
	thumbnail: string
}

// Temporary mock data until YouTube API is integrated
const mockPlaylist: Record<string, Song[]> = {
	happy: [
		{
			id: '1',
			title: 'Happy Song',
			artist: 'Test Artist 1',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Free test audio
			thumbnail: 'https://picsum.photos/200'
		},
		{
			id: '2',
			title: 'Upbeat Track',
			artist: 'Test Artist 2',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
			thumbnail: 'https://picsum.photos/200'
		}
	],
	sad: [
		// Add more mock playlists for different moods
	]
}

export const getPlaylist = async (mood: string): Promise<Song[]> => {
	try {
		// For development, return mock data
		return mockPlaylist[mood.toLowerCase()] || mockPlaylist.happy

		// When ready for production:
		// const response = await axios.get(`/api/music?mood=${mood}`)
		// return response.data.songs
	} catch (error) {
		console.error('Failed to fetch playlist:', error)
		return []
	}
}