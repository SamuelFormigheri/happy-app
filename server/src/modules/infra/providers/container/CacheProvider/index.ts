import { container } from 'tsyringe';

import ICacheProvider from '../../models/CacheProvider/ICacheProvider';
import RedisCacheProvider from '../../implementations/CacheProvider/RedisCacheProvider';

container.registerSingleton<ICacheProvider>('CacheProvider', RedisCacheProvider);