import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import path from 'path';
import { router } from './routes';


// create a server and json response type
const app = express();
app.use(express.json());

// enable cors
app.use(cors());

// use routes
app.use(router);

// to access images in directory
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
);


/**
 * middleware to handle errors messages 
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error!'
    })
});


/**
 * configure server port and start server
 */
const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));