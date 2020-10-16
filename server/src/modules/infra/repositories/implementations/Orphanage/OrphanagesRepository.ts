import { getRepository, Repository } from 'typeorm';
import Orphanage from '@modules/infra/models/Orphanage/Orphanage';

import IOrphanagesRepository from '../../models/Orphanage/IOrphanagesRepository';
import IOrphanageCreateDTO from '@modules/dtos/Orphanage/IOrphanageCreateDTO';

class OrphanagesRepository implements IOrphanagesRepository{

    //#region Atributes
    /**Atribute ormRepository: it is the attribute of repository */
    private ormRepository: Repository<Orphanage>;
    //#endregion

    //#region Constructors
    /**Constructor constructor(): it populates all attributes */
    constructor(){
        this.ormRepository = getRepository(Orphanage);
    }
    //#endregion

    //#region Methods

    public async findAll(): Promise<Orphanage[]>{
        const findOrphanages = await this.ormRepository.find({relations: ['images']});

        return findOrphanages; 
    }

    /**Method findById: it receives an id and returns the user */
    public async findById(id: string): Promise<Orphanage | null> {
        const findOrphanage = await this.ormRepository.findOne({
            where: { id: id },
            relations: ['images']
        });

        return findOrphanage || null;
    }

    public async findByName(name: string): Promise<Orphanage | null> {
        const findOrphanage = await this.ormRepository.findOne({
            where: { name: name },
            relations: ['images']
        });

        return findOrphanage || null;
    }

    /**Method create: it receives email, password and name and create and save user on db */
    public async create(data: IOrphanageCreateDTO) : Promise<Orphanage> {
       const orphanage = this.ormRepository.create(data);

       await this.ormRepository.save(orphanage);

       return orphanage;
    }
    /**Method save: it receives the user obj and save on db */
    public async save(orphanage: Orphanage) : Promise<Orphanage> {
        await this.ormRepository.save(orphanage);
 
        return orphanage;
    }
    //#endregion
}

export default OrphanagesRepository;