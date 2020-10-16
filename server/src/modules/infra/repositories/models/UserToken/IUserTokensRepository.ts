import UserToken from '@modules/infra/models/UserToken/UserToken';

export default interface IUserTokensRepository {
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | null>;
}