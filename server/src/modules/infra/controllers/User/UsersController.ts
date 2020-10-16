import {container} from 'tsyringe';
import {Request, Response} from 'express';

import UserView from '@modules/infra/views/User/UserView';
import UserCreateService from '@modules/infra/services/User/UserCreateService';
import UserUpdateAvatarService from '@modules/infra/services/User/UserUpdateAvatarService';

export default class UsersController{
    async create(request :Request, response :Response) :Promise<Response>{
        const { name, email, password } = request.body;
    
        const createUser = container.resolve(UserCreateService);
    
        const user = await createUser.execute({
            name: name,
            email: email,
            password: password
        });
    
        return response.json(UserView.render(user));
    }

    async updateAvatar(request :Request, response :Response) :Promise<Response>{
        const updateUserAvatar = container.resolve(UserUpdateAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });
   
        return response.json(UserView.render(user));  
    }
}

