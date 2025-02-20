import { Router, Request, Response } from 'express';

const router = Router();

// Sample TV shows data
const tvShows = [
    { id: 1, title: 'Breaking Bad', genre: 'Drama', seasons: 5 },
    { id: 2, title: 'Stranger Things', genre: 'Sci-Fi', seasons: 4 },
    { id: 3, title: 'The Office', genre: 'Comedy', seasons: 9 },
    { id: 4, title: 'Friends', genre: 'Comedy', seasons: 10 },
    { id: 5, title: 'Game of Thrones', genre: 'Fantasy', seasons: 8 },
    { id: 6, title: 'The Mandalorian', genre: 'Sci-Fi', seasons: 2 },
    { id: 7, title: 'Sherlock', genre: 'Crime', seasons: 4 },
    { id: 8, title: 'The Crown', genre: 'Drama', seasons: 4 },
    { id: 9, title: 'The Simpsons', genre: 'Animation', seasons: 32 },
    { id: 10, title: 'The Witcher', genre: 'Fantasy', seasons: 2 },
    { id: 11, title: 'The spongebob', genre: 'Fantasy', seasons: 13 },
    { id: 12, title: 'Dragon Ball Z', genre: 'Action', seasons: 3 },

];

// Get all TV shows or filter by genre
router.get('/', (req: Request, res: Response) => {
    const genre = req.query.genre;

    // Check if genre is a string
    if (typeof genre === 'string') {
        const filteredShows = tvShows.filter(show => show.genre.toLowerCase() === genre.toLowerCase());
        res.json(filteredShows);
    } else {
        res.json(tvShows);
    }
});

// Get a specific TV show by its ID
router.get('/:id', (req: Request, res: Response) => {
    const showId = parseInt(req.params.id, 10);
    const show = tvShows.find(s => s.id === showId);
    if (show) {
        res.json(show);
    } else {
        res.status(404).json({ message: 'TV show not found' });
    }
});

export default router;
