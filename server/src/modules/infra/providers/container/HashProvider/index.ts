import { container } from 'tsyringe';

import IHashProvider from '../../models/HashProvider/IHashProvider';
import BCryptHashProvider from '../../implementations/HashProvider/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);