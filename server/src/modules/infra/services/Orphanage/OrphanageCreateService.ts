import { injectable, inject} from 'tsyringe';

import Orphanage from '@modules/infra/models/Orphanage/Orphanage';
import AppError from '@shared/errors/AppError';

import IOrphanagesRepository from '@modules/infra/repositories/models/Orphanage/IOrphanagesRepository';
import IStorageProvider from '@modules/infra/providers/models/StorageProvider/IStorageProvider';

interface IImage{
    path: string;
}

interface IRequest {
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    whatsapp: string;
    images: IImage[];
}

@injectable()
class OrphanageCreateService {
    private orphanagesRepository: IOrphanagesRepository;
    private storageProvider: IStorageProvider;

    constructor(@inject('OrphanagesRepository') orphanagesRepository: IOrphanagesRepository,
    @inject('StorageProvider') storageProvider: IStorageProvider){
        this.orphanagesRepository = orphanagesRepository;
        this.storageProvider = storageProvider;
    }

    public async execute(obj : IRequest) : Promise<Orphanage>  {
        const checkOrphanage = await this.orphanagesRepository.findByName(obj.name);

        if (checkOrphanage){
            throw new AppError('Name already used.');
        }

        const orphanage = await this.orphanagesRepository.create({
            name: obj.name,
            latitude: obj.latitude,
            longitude: obj.longitude,
            about: obj.about,
            instructions: obj.instructions,
            opening_hours: obj.opening_hours,
            open_on_weekends: obj.open_on_weekends,
            whatsapp: obj.whatsapp,
            images: obj.images
        });
        orphanage.images.map(image => this.storageProvider.saveFile(image.path));

        return orphanage;
    }
}

export default OrphanageCreateService;