import express from 'express';
import { router } from './routes';

const app = express();
app.use(express.json());

app.use(router);

const port = 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));