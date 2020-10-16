import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from '../../models/StorageProvider/IStorageProvider';
import DiskStorageProvider from '../../implementations/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '../../implementations/StorageProvider/S3StorageProvider';

container.registerInstance<IStorageProvider>('StorageProvider', uploadConfig.driver === 'disk' ? 
container.resolve(DiskStorageProvider) : container.resolve(S3StorageProvider));