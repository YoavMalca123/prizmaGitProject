import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/tvShowRoutes';

const app: Application = express();
const port = 3002;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/tvshows', userRoutes);

// Basic route for testing
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from my shows API!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
