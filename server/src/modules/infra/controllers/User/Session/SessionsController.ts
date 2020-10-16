import { container } from 'tsyringe';
import {Request, Response} from 'express';

import UserView from '@modules/infra/views/User/UserView';
import UserAuthenticateService from '@modules/infra/services/User/UserAuthenticateService';


export default class SessionsController{
    async authenticate(request :Request, response :Response) :Promise<Response>{   
        const { email, password } = request.body;
    
        const authenticateUser = container.resolve(UserAuthenticateService);
    
        const authCredentials = await authenticateUser.execute({
            email: email,
            password: password
        });

        const user = UserView.render(authCredentials.user);
        const token = authCredentials.token;

        return response.json({user, token});
    }  
}