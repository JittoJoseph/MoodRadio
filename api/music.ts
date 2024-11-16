// api/music.ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}

	const moodId = req.query.moodId as string
	const apiKey = process.env.YOUTUBE_API_KEY

	try {
		const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
			params: {
				part: 'snippet',
				q: `${moodId} music`,
				maxResults: 10,
				type: 'video',
				key: apiKey,
			},
		})

		const songs = response.data.items.map((item: any) => ({
			id: item.id.videoId,
			title: item.snippet.title,
			artist: item.snippet.channelTitle,
			url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
		}))

		res.status(200).json({ songs })
	} catch (error) {
		console.error('Failed to fetch playlist', error)
		res.status(500).json({ error: 'Failed to fetch playlist' })
	}
}