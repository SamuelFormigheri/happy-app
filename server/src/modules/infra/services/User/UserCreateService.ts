import { injectable, inject} from 'tsyringe';

import User from '@modules/infra/models/User/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/infra/providers/models/HashProvider/IHashProvider';

import IUsersRepository from '@modules/infra/repositories/models/User/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class UserCreateService {
    private usersRepository: IUsersRepository;
    private hashProvider: IHashProvider; 

    constructor(@inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('HashProvider') hashProvider: IHashProvider){
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }

    public async execute(obj : IRequest) : Promise<User>  {
        const checkUserExistance = await this.usersRepository.findByEmail(obj.email);

        if (checkUserExistance){
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.hashProvider.generateHash(obj.password);

        const user = this.usersRepository.create({
            name: obj.name,
            email: obj.email,
            password: hashedPassword
        });

        return user;
    }
}

export default UserCreateService