import { injectable, inject } from 'tsyringe';
import Orphanage from '@modules/infra/models/Orphanage/Orphanage';

import IOrphanagesRepository from '@modules/infra/repositories/models/Orphanage/IOrphanagesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class OrphanageGetService {
    private orphanagesRepository: IOrphanagesRepository;

    constructor(@inject('OrphanagesRepository') orphanagesRepository: IOrphanagesRepository){ 
        this.orphanagesRepository = orphanagesRepository;
    }

    public async execute(id: string): Promise<Orphanage | null>{             
        const orphanage = await this.orphanagesRepository.findById(id);
        if(!orphanage){
            throw new AppError('Orphanage not found');
        }
        return orphanage;
    }
}

export default OrphanageGetService;