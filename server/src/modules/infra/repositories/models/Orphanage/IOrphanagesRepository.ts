import Orphanage from '@modules/infra/models/Orphanage/Orphanage';
import IOrphanageCreateDTO from '@modules/dtos/Orphanage/IOrphanageCreateDTO';

export default interface IOrphanagesRepository{
    findAll(): Promise<Orphanage[]>;
    create(data: IOrphanageCreateDTO): Promise<Orphanage>;
    save(orphanage: Orphanage): Promise<Orphanage>;
    findById(id: string): Promise<Orphanage | null>; 
    findByName(name: string): Promise<Orphanage | null>; 
}