import ISendMailDTO from "../../dtos/MailProvider/ISendMailDTO";

export default interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}