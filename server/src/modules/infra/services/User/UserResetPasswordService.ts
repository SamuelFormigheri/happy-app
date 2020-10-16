import { injectable, inject} from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/infra/repositories/models/User/IUsersRepository';
import IUserTokensRepository from '@modules/infra/repositories/models/UserToken/IUserTokensRepository';
import IHashProvider from '@modules/infra/providers/models/HashProvider/IHashProvider';


interface IRequest {
    token: string;
    password: string;
}
@injectable()
class UserResetPasswordService {
    private usersRepository: IUsersRepository;
    private userTokensRepository: IUserTokensRepository;
    private hashProvider: IHashProvider;

    constructor(@inject('UsersRepository') usersRepository: IUsersRepository,
    @inject('UserTokensRepository') userTokensRepository : IUserTokensRepository,
    @inject('HashProvider') hashProvider : IHashProvider){
        this.usersRepository = usersRepository;
        this.userTokensRepository = userTokensRepository;
        this.hashProvider = hashProvider;
    }

    public async execute(obj : IRequest) : Promise<void>  {
        const userToken = await this.userTokensRepository.findByToken(obj.token);

        if(!userToken){
            throw new AppError('Token not found.', 401);
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user){
            throw new AppError('User not found.', 401); 
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired.', 401); 
        }

        user.password = await this.hashProvider.generateHash(obj.password);

        await this.usersRepository.save(user);
    }
}

export default UserResetPasswordService;