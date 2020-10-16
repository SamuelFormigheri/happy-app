import { getRepository, Repository } from 'typeorm';
import User from '@modules/infra/models/User/User';

import IUsersRepository from '../../models/User/IUsersRepository';
import IUserCreateDTO from '@modules/dtos/User/IUserCreateDTO';

class UsersRepository implements IUsersRepository{

    //#region Atributes
    /**Atribute ormRepository: it is the attribute of repository */
    private ormRepository: Repository<User>;
    //#endregion

    //#region Constructors
    /**Constructor constructor(): it populates all attributes */
    constructor(){
        this.ormRepository = getRepository(User);
    }
    //#endregion

    //#region Methods
    /**Method findById: it receives an id and returns the user */
    public async findById(id: string): Promise<User | null> {
        const findUser = await this.ormRepository.findOne({
            where: { id: id }
        });

        return findUser || null;
    }
    /**Method findByEmail: it receives an email and returns the user */
    public async findByEmail(email: string): Promise<User | null> {
        const findUser = await this.ormRepository.findOne({
            where: { email: email }
        });
        return findUser || null;
    }
    /**Method create: it receives email, password and name and create and save user on db */
    public async create(data: IUserCreateDTO) : Promise<User> {
       const user = this.ormRepository.create(data);

       await this.ormRepository.save(user);

       return user;
    }
    /**Method save: it receives the user obj and save on db */
    public async save(user: User) : Promise<User> {
        await this.ormRepository.save(user);
 
        return user;
    }
    //#endregion
}

export default UsersRepository;