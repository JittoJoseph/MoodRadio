// src/components/MusicPlayer.tsx
import React from 'react'
import { getPlaylist } from '../services/youtubeService'

const MusicPlayer: React.FC<{ mood: string }> = ({ mood }) => {
	const [playlist, setPlaylist] = React.useState<any[]>([])

	React.useEffect(() => {
		const fetchPlaylist = async () => {
			const songs = await getPlaylist(mood)
			setPlaylist(songs)
		}
		fetchPlaylist()
	}, [mood])

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