import { injectable, inject} from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/infra/repositories/models/User/IUsersRepository';
import IUserTokensRepository from '@modules/infra/repositories/models/UserToken/IUserTokensRepository';
import IMailProvider from '@modules/infra/providers/models/MailProvider/IMailProvider';


interface IRequest {
    email: string;
}
@injectable()
class UserSendForgotPasswordEmailService {
    private usersRepository: IUsersRepository;
    private userTokensRepository: IUserTokensRepository;
    private mailProvider: IMailProvider;

    constructor(@inject('UsersRepository') usersRepository: IUsersRepository, 
    @inject('UserTokensRepository') userTokensRepository : IUserTokensRepository,
    @inject('MailProvider') mailProvider : IMailProvider)
    {
        this.usersRepository = usersRepository;
        this.userTokensRepository = userTokensRepository;
        this.mailProvider = mailProvider;
    }

    public async execute(obj : IRequest) : Promise<void>  {
        const user = await this.usersRepository.findByEmail(obj.email);

        if(!user){
            throw new AppError('User does not exists.', 401);
        }

        const {token} = await this.userTokensRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(__dirname, '..', '..', 'views' ,'forgot_password.hbs');

        await this.mailProvider.sendMail({
            to:{
                name: user.name,
                email: user.email
            },
            subject: '[GoBarber] - Recuperação de Senha',
            templateData:{
                file: forgotPasswordTemplate,
                variables:{
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
                }
            }
        });
    }
}

export default UserSendForgotPasswordEmailService;