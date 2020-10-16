import { compare, hash } from 'bcryptjs';
import IHashProvider from '../../models/HashProvider/IHashProvider';

export default class BCryptHashProvider implements IHashProvider{

    //#region Methods
    /**Method generateHash: it generates the hash by passing an string */
    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }
    /**Method compareHash: it compares the hash by passing an string and the hashed that you want to compare with */
    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed);
    }
    //#endregion

}