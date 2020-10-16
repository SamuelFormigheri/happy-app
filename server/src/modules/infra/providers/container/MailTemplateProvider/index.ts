import { container } from 'tsyringe';

import IMailTemplateProvider from '../../models/MailTemplateProvider/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '../../implementations/MailTemplateProvider/HandlebarsMailTemplateProvider';

container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);