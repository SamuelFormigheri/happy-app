import {Request, Response} from 'express';
import {container} from 'tsyringe';


import UserView from '@modules/infra/views/User/UserView';
import UserUpdateProfileService from '@modules/infra/services/User/UserUpdateProfileService';
import UserShowProfileService from '@modules/infra/services/User/UserShowProfileService';

export default class ProfileController {
    async show(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;
        const showProfile = container.resolve(UserShowProfileService);
        const user = await showProfile.execute({user_id});
              
        return response.json(UserView.render(user));
    }
    async update(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;
        const { email, password, name, old_password } = request.body;

        const updateProfile = container.resolve(UserUpdateProfileService);
    
        const user = await updateProfile.execute({
            email: email,
            password: password,
            name: name,
            user_id:user_id,
            old_password: old_password
        });

       
        return response.json(UserView.render(user));
    }
}