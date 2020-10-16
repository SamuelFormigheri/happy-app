import { container } from 'tsyringe';

import IUserTokensRepository from '@modules/infra/repositories/models/UserToken/IUserTokensRepository';
import UserTokensRepository from '@modules/infra/repositories/implementations/UserToken/UserTokensRepository';

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);