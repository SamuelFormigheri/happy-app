import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from '../../models/MailProvider/IMailProvider';
import EtherealMailProvider from '../../implementations/MailProvider/EtherealMailProvider';
import SESMailProvider from '../../implementations/MailProvider/SESMailProvider';

container.registerInstance<IMailProvider>('MailProvider', mailConfig.driver === 'ethereal' ? 
container.resolve(EtherealMailProvider) : container.resolve(SESMailProvider));