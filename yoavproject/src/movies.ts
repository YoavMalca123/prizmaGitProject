import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/movieRoutes';

const app: Application = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/movies', userRoutes);

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from my movies API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
