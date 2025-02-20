import { Router, Request, Response } from 'express';

const router = Router();

// Sample movies data
const movies = [
    { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010 },
    { id: 2, title: 'The Dark Knight', genre: 'Action', year: 2008 },
    { id: 3, title: 'Interstellar', genre: 'Sci-Fi', year: 2014 },
    { id: 4, title: 'The Matrix', genre: 'Sci-Fi', year: 1999 },
    { id: 5, title: 'The Godfather', genre: 'Crime', year: 1972 },
    { id: 6, title: 'Fight Club', genre: 'Drama', year: 1999 },
    { id: 7, title: 'Pulp Fiction', genre: 'Crime', year: 1994 },
    { id: 8, title: 'The Lord of the Rings', genre: 'Fantasy', year: 2001 },
    { id: 9, title: 'Gladiator', genre: 'Action', year: 2000 },
    { id: 10, title: 'Titanic', genre: 'Romance', year: 1997 },
];

// Get all movies or filter by genre
router.get('/', (req: Request, res: Response) => {
    const genre = req.query.genre;

    // Check if genre is a string
    if (typeof genre === 'string') {
        const filteredMovies = movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
        res.json(filteredMovies);
    } else {
        res.json(movies);
    }
});

// Get a specific movie by its ID
router.get('/:id', (req: Request, res: Response) => {
    const movieId = parseInt(req.params.id, 10);
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

export default router;
