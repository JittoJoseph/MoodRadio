import React, { useState } from 'react'
import './App.css'
import WebcamCapture from './components/WebcamCapture'
import MoodAnalyzer from './components/MoodAnalyzer'
import MusicPlayer from './components/MusicPlayer'
import AudioVisualizer from './components/AudioVisualizer'

const App: React.FC = () => {
	const [capturedImage, setCapturedImage] = useState<string | null>(null)
	const [mood, setMood] = useState<string | null>(null)

	return (
		<div className="container mx-auto p-4">
			{!capturedImage && <WebcamCapture onCapture={setCapturedImage} />}
			{capturedImage && !mood && (
				<MoodAnalyzer image={capturedImage} onMoodDetected={setMood} />
			)}
			{mood && <MusicPlayer mood={mood} />}
			<AudioVisualizer />
		</div>
	)
}

export default App
