import User from '@modules/infra/models/User/User';
import IUserCreateDTO from '@modules/dtos/User/IUserCreateDTO';

export default interface IUsersRepository{
    create(data: IUserCreateDTO): Promise<User>;
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>; 
    findByEmail(id: string): Promise<User | null>;
}