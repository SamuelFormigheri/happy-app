import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IStorageProvider from '../../models/StorageProvider/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider{

    //#region Methods
    /**Method saveFile: it receives an file and saves on storage defined on multer config */
    public async saveFile(file:string): Promise<string>{
        await fs.promises.rename(
            path.resolve(uploadConfig.directory, file),
            path.resolve(uploadConfig.persistantDirectory, file)
        );
        return file;
    }
    /**Method deleteFile: it receives an file and delete on storage defined on multer config */
    public async deleteFile(file:string): Promise<void>{
        const filepath = path.resolve(uploadConfig.persistantDirectory, file);   

        try
        {
            await fs.promises.stat(filepath);
            await fs.promises.unlink(filepath);
        }
        catch(err)
        {
            return;
        }
    }
    //#endregion
    
}