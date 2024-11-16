// server.js
import express from 'express'
import cors from 'cors'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

app.post('/api/mood', (req, res) => {
	// Mock mood detection
	const moods = ['happy', 'sad', 'energetic', 'relaxed', 'focused']
	const randomMood = moods[Math.floor(Math.random() * moods.length)]
	res.json({ mood: randomMood, confidence: 0.95, timestamp: Date.now() })
})

app.get('/api/music', (req, res) => {
	const mockSongs = [
		{ id: '1', title: 'Happy Song', artist: 'Artist 1', url: 'https://www.youtube.com/watch?v=1' },
		{ id: '2', title: 'Sad Song', artist: 'Artist 2', url: 'https://www.youtube.com/watch?v=2' },
	]
	res.json({ songs: mockSongs })
})

app.listen(port, () => {
	console.log(`Development server running on port ${port}`)
})