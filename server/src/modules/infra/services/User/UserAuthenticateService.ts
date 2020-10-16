import { injectable, inject} from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import User from '@modules/infra/models/User/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/infra/providers/models/HashProvider/IHashProvider';

import IUsersRepository from '@modules/infra/repositories/models/User/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
}

@injectable()
class UserAuthenticateService {
    private usersRepository: IUsersRepository; 
    private hashProvider: IHashProvider; 

    constructor(@inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('HashProvider') hashProvider: IHashProvider){
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }

    public async execute(obj: IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(obj.email);

        if(!user){
            throw new AppError('Email/Password incorrect.', 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(obj.password, user.password);
        
        if(!passwordMatched){
            throw new AppError('Email/Password incorrect.', 401);
        }

        const token = sign({},  authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {user, token};

    }
}

export default UserAuthenticateService;