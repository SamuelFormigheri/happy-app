import { injectable, inject } from 'tsyringe';
import Orphanage from '@modules/infra/models/Orphanage/Orphanage';

import IOrphanagesRepository from '@modules/infra/repositories/models/Orphanage/IOrphanagesRepository';

@injectable()
class OrphanageListService {
    private orphanagesRepository: IOrphanagesRepository;

    constructor(@inject('OrphanagesRepository') orphanagesRepository: IOrphanagesRepository){ 
        this.orphanagesRepository = orphanagesRepository;
    }

    public async execute(): Promise<Orphanage[]>{             
        const orphanages = await this.orphanagesRepository.findAll();
        return orphanages;
    }
}

export default OrphanageListService;