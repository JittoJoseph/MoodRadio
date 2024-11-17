// src/components/WebcamCapture.tsx
import React, { useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Button } from './ui/button'
import { Camera } from 'lucide-react'

const WebcamCapture: React.FC<{ onCapture: (image: string) => void }> = ({ onCapture }) => {
	const [isWebcamReady, setIsWebcamReady] = useState(false)
	const webcamRef = React.useRef<Webcam>(null)

	const handleUserMedia = useCallback(() => {
		console.log('Webcam ready')
		setIsWebcamReady(true)
	}, [])

	const handleUserMediaError = useCallback((error: string | DOMException) => {
		console.error('Webcam error:', error)
		setIsWebcamReady(false)
	}, [])

	const capture = () => {
		const imageSrc = webcamRef.current?.getScreenshot()
		if (imageSrc) {
			onCapture(imageSrc)
		}
	}

	return (
		<div className="bg-gray-900 p-6 rounded-lg">
			<div className="relative">
				<div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none" />
				<Webcam
					ref={webcamRef}
					screenshotFormat="image/jpeg"
					onUserMedia={handleUserMedia}
					onUserMediaError={handleUserMediaError}
					mirrored
					className="rounded-lg w-full max-w-2xl mx-auto"
				/>
			</div>
			<Button
				onClick={capture}
				disabled={!isWebcamReady}
				className="mt-4 w-full max-w-md mx-auto flex items-center justify-center gap-2 
                  bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
			>
				<Camera className="w-5 h-5" />
				{isWebcamReady ? 'Capture Mood' : 'Loading Camera...'}
			</Button>
			<div className="mt-2 text-center text-sm text-gray-400">
				{`Camera Status: ${isWebcamReady ? 'Ready' : 'Not Ready'}`}
			</div>
		</div>
	)
}

export default WebcamCapture