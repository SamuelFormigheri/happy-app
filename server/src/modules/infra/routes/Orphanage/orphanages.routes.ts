import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import OrphanagesController from '@modules/infra/controllers/Orphanage/OrphanagesController';
import verifyAuthenticated from '@modules/infra/middlewares/User/verifyAuthenticated';

const orphanagesRouter = Router();
const upload = multer(uploadConfig.config.disk);
const orphanagesController = new OrphanagesController();

orphanagesRouter.use(verifyAuthenticated);

orphanagesRouter.get('/', orphanagesController.index);

orphanagesRouter.get('/:id', orphanagesController.show);

orphanagesRouter.post('/', upload.array('images'), orphanagesController.create);

export default orphanagesRouter;