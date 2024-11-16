// src/components/MusicPlayer.tsx
import React, { useEffect } from 'react'
import { getPlaylist } from '../services/youtubeService'

const MusicPlayer: React.FC<{ mood: string; onAudioElementReady: (audio: HTMLAudioElement) => void }> = ({ mood, onAudioElementReady }) => {
	const [playlist, setPlaylist] = React.useState<any[]>([])

	React.useEffect(() => {
		const fetchPlaylist = async () => {
			const songs = await getPlaylist(mood)
			setPlaylist(songs)
		}
		fetchPlaylist()
	}, [mood])

	useEffect(() => {
		if (playlist.length > 0) {
			const audio = new Audio(playlist[0].url)
			audio.play()
			onAudioElementReady(audio)
		}
	}, [playlist, onAudioElementReady])

	return (
		<div>
			<h2 className="text-xl">Playlist for {mood}</h2>
			<ul>
				{playlist.map(song => (
					<li key={song.id}>{song.title} by {song.artist}</li>
				))}
			</ul>
		</div>
	)
}

export default MusicPlayer