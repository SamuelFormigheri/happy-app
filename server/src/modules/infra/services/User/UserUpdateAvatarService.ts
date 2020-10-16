import { injectable, inject} from 'tsyringe';

import User from '@modules/infra/models/User/User';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@modules/infra/providers/models/StorageProvider/IStorageProvider';

import IUsersRepository from '@modules/infra/repositories/models/User/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UserUpdateAvatarService {
    private usersRepository: IUsersRepository;
    private storageProvider: IStorageProvider;

    constructor(@inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('StorageProvider') storageProvider: IStorageProvider){
        this.usersRepository = usersRepository;
        this.storageProvider = storageProvider;
    }


    public async execute(obj: IRequest) : Promise<User>{
        const user = await this.usersRepository.findById(obj.user_id);

        if(!user){
            throw new AppError('Only authenticated users can change avatar.', 401);
        }

        if(user.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }
        const fileName = await this.storageProvider.saveFile(obj.avatarFilename);

        user.avatar = fileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UserUpdateAvatarService;