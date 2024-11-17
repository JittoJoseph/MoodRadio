// src/components/MusicPlayer.tsx
import React, { useEffect, useRef, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Button } from './ui/button'
import { getPlaylist, Song } from '../services/youtubeService'

interface MusicPlayerProps {
	mood: string
	onAudioElementReady: (audio: HTMLAudioElement) => void
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ mood, onAudioElementReady }) => {
	const [playlist, setPlaylist] = useState<Song[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [isAudioLoading, setIsAudioLoading] = useState(false)
	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		const fetchPlaylist = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const songs = await getPlaylist(mood)
				setPlaylist(songs)
				if (audioRef.current) {
					onAudioElementReady(audioRef.current)
				}
			} catch (err) {
				setError('Failed to load playlist')
				console.error(err)
			} finally {
				setIsLoading(false)
			}
		}
		fetchPlaylist()
	}, [mood, onAudioElementReady])

	// Debug logging
	useEffect(() => {
		console.log('Current playlist:', playlist)
		console.log('Current index:', currentIndex)
		console.log('Current song:', playlist[currentIndex])
	}, [playlist, currentIndex])

	const togglePlay = async () => {
		if (audioRef.current) {
			try {
				setIsAudioLoading(true);
				if (isPlaying) {
					await audioRef.current.pause();
				} else {
					await audioRef.current.play();
				}
				setIsPlaying(!isPlaying);
			} catch (err) {
				console.error('Playback error:', err);
				setError('Failed to play audio');
			} finally {
				setIsAudioLoading(false);
			}
		}
	}

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100
			setProgress(progress)
		}
	}

	const handleNext = () => {
		setCurrentIndex((prev) => (prev + 1) % playlist.length)
	}

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
	}

	const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
		console.error('Audio error:', e)
		setError('Failed to play audio')
		setIsPlaying(false)
	}

	const handleAudioLoad = () => {
		console.log('Audio loaded successfully');
		setIsAudioLoading(false);
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-20">
				<div className="text-gray-400">Loading playlist...</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col w-full gap-4">
			<audio
				ref={audioRef}
				src={playlist[currentIndex]?.url}
				onLoadedData={handleAudioLoad}
				onTimeUpdate={handleTimeUpdate}
				onEnded={handleNext}
				onError={handleError}
				onPlay={() => setIsPlaying(true)}
				onPause={() => setIsPlaying(false)}
			/>

			{error && (
				<div className="text-red-500 text-sm text-center">
					{error}
				</div>
			)}

			{/* Player Controls */}
			<div className="flex items-center justify-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={handlePrev}
					disabled={playlist.length <= 1}
					className="text-gray-400 hover:text-white"
				>
					<SkipBack className="h-5 w-5" />
				</Button>

				<Button
					onClick={togglePlay}
					size="icon"
					className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
					disabled={isAudioLoading || playlist.length === 0}
				>
					{isAudioLoading ? (
						<div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
					) : isPlaying ? (
						<Pause className="h-6 w-6" />
					) : (
						<Play className="h-6 w-6 ml-0.5" />
					)}
				</Button>

				<Button
					variant="ghost"
					size="icon"
					onClick={handleNext}
					disabled={playlist.length <= 1}
					className="text-gray-400 hover:text-white"
				>
					<SkipForward className="h-5 w-5" />
				</Button>
			</div>

			{/* Progress Bar */}
			<div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
				<div
					className="h-full bg-gradient-to-r from-purple-500 to-teal-400 transition-all duration-100"
					style={{ width: `${progress}%` }}
				/>
			</div>

			{/* Current Song Info */}
			{playlist[currentIndex] && (
				<div className="text-center">
					<div className="font-medium text-gray-100">
						{playlist[currentIndex].title}
					</div>
					<div className="text-sm text-gray-400">
						{playlist[currentIndex].artist}
					</div>
				</div>
			)}

			{/* Debug info */}
			<div className="text-xs text-gray-500">
				{`Audio State: ${isPlaying ? 'Playing' : 'Paused'}`}
				{` | Loading: ${isAudioLoading}`}
				{` | URL: ${playlist[currentIndex]?.url}`}
			</div>
		</div>
	)
}

export default MusicPlayer