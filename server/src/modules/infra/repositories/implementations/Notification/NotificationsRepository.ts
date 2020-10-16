import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateNotificationDTO from '../../dtos/Notification/ICreateNotificationDTO';
import INotificationsRepository from '../../models/Notification/INotificationsRepository';
import Notification from '@modules/infra/schemas/Notification/Notification';

class NotificationsRepository implements INotificationsRepository{
    private ormRepository: MongoRepository<Notification>;

    constructor(){
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create(obj: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({
            content: obj.content,
            recipient_id: obj.recipient_id
        });

        await this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationsRepository;