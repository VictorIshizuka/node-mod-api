import { Router } from 'express';

import * as ApiController from '../controllers/apiController';

const router = Router();

router.get('/ping', ApiController.ping)
router.get('/random', ApiController.random);
router.get('/nome/:nome', ApiController.name);

router.post('/frases', ApiController.createPhrase);
router.get('/frases', ApiController.listPhrases);
router.get('/frases/random', ApiController.randomPhrase);
router.get('/frases/:id', ApiController.findPhrase);
router.put('/frases/:id', ApiController.editPhrase);
router.delete('/frases/:id', ApiController.removePhrase);


export default router;