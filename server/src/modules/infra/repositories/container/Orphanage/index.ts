import { container } from 'tsyringe';

import IOrphanagesRepository from '@modules/infra/repositories/models/Orphanage/IOrphanagesRepository';
import OrphanagesRepository from '@modules/infra/repositories/implementations/Orphanage/OrphanagesRepository';

container.registerSingleton<IOrphanagesRepository>('OrphanagesRepository', OrphanagesRepository);