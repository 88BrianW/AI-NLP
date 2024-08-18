import React, { useState } from 'react';

const MovieCard = () => {

	const [title, setTitle] = useState('Movie Name');
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const fetchMovie = async () => {
		setLoading(true);
		setError('');
		try {
			const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}`);
			const data = await response.json();
			if (data.Response === 'True') {
				setMovie(data);
			} else {
				setError(data.Error);
			}
		} catch (err) {
			setError('Failed to fetch movie details.');
		}
		setLoading(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchMovie();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter movie title"
				/>
				<button type="submit" disabled={loading}>
					{loading ? 'Loading...' : 'Submit'}
				</button>
			</form>

			{
				error && 
				<p style={{ color: 'red' }}>
					{error}
				</p>
			}


			{movie && (
				<div>
					<h2>{movie.Title}</h2>
					<p><strong>Year:</strong> {movie.Year}</p>
					<p><strong>Rated:</strong> {movie.Rated}</p>
					<p><strong>Released:</strong> {movie.Released}</p>
					<p><strong>Runtime:</strong> {movie.Runtime}</p>
					<p><strong>Genre:</strong> {movie.Genre}</p>
					<p><strong>Director:</strong> {movie.Director}</p>
					<p><strong>Writer:</strong> {movie.Writer}</p>
					<p><strong>Actors:</strong> {movie.Actors}</p>
					<p><strong>Plot:</strong> {movie.Plot}</p>
					<p><strong>Language:</strong> {movie.Language}</p>
					<p><strong>Country:</strong> {movie.Country}</p>
					<p><strong>Awards:</strong> {movie.Awards}</p>
					<img src={movie.Poster} alt={`${movie.Title} poster`} />
				</div>
			)}
		</div>
	);
};

export default MovieCard;
