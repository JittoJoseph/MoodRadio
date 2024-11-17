import React, { useState } from 'react'
import WebcamCapture from './components/WebcamCapture'
import MoodAnalyzer from './components/MoodAnalyzer'
import MusicPlayer from './components/MusicPlayer'
import AudioVisualizer from './components/AudioVisualizer'
import { Volume2, RefreshCw } from 'lucide-react'

const App: React.FC = () => {
	const [capturedImage, setCapturedImage] = useState<string | null>(null)
	const [currentMood, setCurrentMood] = useState<string | null>(null)
	const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)

	return (
		<div className="relative flex flex-col min-h-screen bg-gray-900">
			{/* Main Content */}
			<main className="flex-1 px-6 pb-24">
				{/* Top Section */}
				<div className="pt-8 pb-12">
					<h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-400">
						MoodTone
					</h1>
					{!currentMood && (
						<p className="mt-2 text-gray-400">
							Let's find the perfect soundtrack for your mood
						</p>
					)}
				</div>

				{/* Camera/Mood Section */}
				<div className="max-w-2xl mx-auto">
					{!capturedImage ? (
						<div className="relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur">
							<WebcamCapture onCapture={setCapturedImage} />
						</div>
					) : !currentMood ? (
						<div className="flex items-center justify-center h-64 rounded-2xl bg-gray-800/50 backdrop-blur">
							<MoodAnalyzer image={capturedImage} onMoodDetected={setCurrentMood} />
						</div>
					) : null}
				</div>

				{/* Visualizer Section */}
				{audioElement && (
					<div className="relative mt-8 h-[400px] rounded-2xl overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-teal-500/10" />
						<AudioVisualizer audioElement={audioElement} />
					</div>
				)}
			</main>

			{/* Player Bar */}
			{currentMood && (
				<div className="fixed bottom-0 left-0 right-0 bg-gray-800/95 backdrop-blur border-t border-gray-700">
					<div className="max-w-7xl mx-auto px-4">
						<div className="flex items-center h-20">
							{/* Song Info */}
							<div className="flex items-center flex-1">
								<div className="w-16 h-16 bg-gray-700 rounded overflow-hidden">
									{/* Song thumbnail would go here */}
								</div>
								<div className="ml-4">
									<div className="font-medium text-gray-100">Currently Playing</div>
									<div className="text-sm text-gray-400">Artist Name</div>
								</div>
							</div>

							{/* Player Controls */}
							<div className="flex-1">
								<MusicPlayer
									mood={currentMood}
									onAudioElementReady={setAudioElement}
								/>
							</div>

							{/* Volume & Actions */}
							<div className="flex items-center gap-4 flex-1 justify-end">
								<button className="p-2 text-gray-400 hover:text-white transition-colors">
									<Volume2 size={20} />
								</button>
								<button
									onClick={() => {
										setCapturedImage(null)
										setCurrentMood(null)
									}}
									className="p-2 text-gray-400 hover:text-white transition-colors"
								>
									<RefreshCw size={20} />
								</button>
							</div>
						</div>

						{/* Progress Bar */}
						<div className="h-1 w-full bg-gray-700">
							<div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-teal-400" />
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
