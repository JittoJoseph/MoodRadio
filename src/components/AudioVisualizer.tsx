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

	return (
		<mesh ref={meshRef}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="#61dafb" />
		</mesh>
	)
}

export default AudioVisualizer