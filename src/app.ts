import express from 'express';
import bodyParser from 'body-parser';
import exampleRouter from './routes/example.route';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', exampleRouter);

export default app;