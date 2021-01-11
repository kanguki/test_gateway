import * as express from 'express';
import {Request, Response} from 'express';
const router: express.Router = express.Router();

router.get('/', (req: Request, res: Response) => res.send('Yay'));

export default router;
