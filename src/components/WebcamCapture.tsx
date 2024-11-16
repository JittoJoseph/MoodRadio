// src/components/WebcamCapture.tsx
import React from 'react'
import Webcam from 'react-webcam'

const WebcamCapture: React.FC<{ onCapture: (image: string) => void }> = ({ onCapture }) => {
	const webcamRef = React.useRef<Webcam>(null)

	const capture = () => {
		const imageSrc = webcamRef.current?.getScreenshot()
		if (imageSrc) {
			onCapture(imageSrc)
		}
	}

	return (
		<div>
			<Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
			<button onClick={capture} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
				Capture Image
			</button>
		</div>
	)
}

export default WebcamCapture