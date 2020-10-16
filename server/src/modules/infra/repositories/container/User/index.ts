import { container } from 'tsyringe';

import IUsersRepository from '@modules/infra/repositories/models/User/IUsersRepository';
import UsersRepository from '@modules/infra/repositories/implementations/User/UsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);