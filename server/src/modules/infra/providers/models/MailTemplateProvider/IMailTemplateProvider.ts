import IParseMailTemplateDTO from '../../dtos/MailTemplateProvider/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
   parse(data: IParseMailTemplateDTO): Promise<string>; 
}