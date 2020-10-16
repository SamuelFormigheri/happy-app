import {Request, Response} from 'express';
import {container} from 'tsyringe';

import UserSendForgotPasswordEmailService from '@modules/infra/services/User/UserSendForgotPasswordEmailService';
import UserResetPasswordService from '@modules/infra/services/User/UserResetPasswordService';

export default class PasswordsController {
    async forgot(request: Request, response: Response): Promise<Response>{
        const { email } = request.body;
        
        const sendForgotPasswordEmailService = container.resolve(UserSendForgotPasswordEmailService);
        
        await sendForgotPasswordEmailService.execute({
            email: email
        });
       
        return response.status(204).json();
    }
    async reset(request: Request, response: Response): Promise<Response>{
        const { password, token } = request.body;

        const resetPassword = container.resolve(UserResetPasswordService);
    
        await resetPassword.execute({
            password: password,
            token: token
        });
       
        return response.status(204).json();
    }
}