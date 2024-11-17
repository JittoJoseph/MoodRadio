// src/components/AudioVisualizer.tsx
import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AudioVisualizerProps {
	audioElement: HTMLAudioElement | null
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioElement }) => {
	return (
		<div className="w-full h-64">
			<Canvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<VisualizerMesh audioElement={audioElement} />
			</Canvas>
		</div>
	)
}

interface VisualizerMeshProps {
	audioElement: HTMLAudioElement | null
}

const VisualizerMesh: React.FC<VisualizerMeshProps> = ({ audioElement }) => {
	const meshRef = useRef<THREE.Mesh>(null)
	const analyserRef = useRef<AnalyserNode | null>(null)
	const bars = 32 // Number of bars
	const barRefs = useRef<THREE.Mesh[]>([])

	useEffect(() => {
		if (audioElement) {
			const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
			const source = audioContext.createMediaElementSource(audioElement)
			const analyser = audioContext.createAnalyser()
			source.connect(analyser)
			analyser.connect(audioContext.destination)
			analyser.fftSize = 256
			analyserRef.current = analyser

			return () => {
				audioContext.close()
			}
		}
	}, [audioElement])

	useFrame(() => {
		if (analyserRef.current && meshRef.current) {
			const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
			analyserRef.current.getByteFrequencyData(dataArray)
			const avg = dataArray.reduce((a, b) => a + b) / dataArray.length
			const scale = 1 + avg / 128
			meshRef.current.scale.set(scale, scale, scale)
		}
	})

	useFrame(() => {
		if (analyserRef.current) {
			const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
			analyserRef.current.getByteFrequencyData(dataArray)

			// Update each bar
			barRefs.current.forEach((bar, i) => {
				const value = dataArray[i * 2] / 255
				bar.scale.y = Math.max(0.1, value * 3)
			})
		}
	})

	return (
		<group>
			{Array.from({ length: bars }).map((_, i) => (
				<mesh
					key={i}
					ref={(el) => {
						if (el) barRefs.current[i] = el
					}}
					position={[i - bars / 2, 0, 0]}
				>
					<boxGeometry args={[0.5, 1, 0.5]} />
					<meshStandardMaterial color={`hsl(${(i * 360 / bars)}, 100%, 50%)`} />
				</mesh>
			))}
		</group>
	)
}

export default AudioVisualizer