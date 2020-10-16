import ICreateNotificationDTO from "../../dtos/Notification/ICreateNotificationDTO";

import Notification from '@modules/infra/schemas/Notification/Notification';

export default interface INotificationsRepository{
    create(data: ICreateNotificationDTO): Promise<Notification>;
}