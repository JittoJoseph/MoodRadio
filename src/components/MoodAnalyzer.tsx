// src/components/MoodAnalyzer.tsx
import React from 'react'
import { analyzeMood } from '../services/moodService'

const MoodAnalyzer: React.FC<{ image: string, onMoodDetected: (mood: string) => void }> = ({ image, onMoodDetected }) => {
	React.useEffect(() => {
		const fetchMood = async () => {
			const mood = await analyzeMood(image)
			onMoodDetected(mood)
		}
		fetchMood()
	}, [image, onMoodDetected])

	return <div>Analyzing Mood...</div>
}

export default MoodAnalyzer