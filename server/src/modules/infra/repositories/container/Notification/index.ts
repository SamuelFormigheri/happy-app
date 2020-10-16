import { container } from 'tsyringe';

import INotificationsRepository from '@modules/infra/repositories/models/Notification/INotificationsRepository';
import NotificationsRepository from '@modules/infra/repositories/implementations/Notification/NotificationsRepository';

container.registerSingleton<INotificationsRepository>('NotificationsRepository', NotificationsRepository);