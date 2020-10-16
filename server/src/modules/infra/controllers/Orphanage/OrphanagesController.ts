import { container } from 'tsyringe';
import {Request, Response} from 'express';
import * as Yup from 'yup';

import OrphanageView from '@modules/infra/views/Orphanage/OrphanageView';
import OrphanageCreateService from '@modules/infra/services/Orphanage/OrphanageCreateService';
import OrphanageListService from '@modules/infra/services/Orphanage/OrphanageListService';
import OrphanageGetService from '@modules/infra/services/Orphanage/OrphanageGetService';

export default class OrphanagesController{
    async index(request :Request, response :Response) :Promise<Response>{
        const listOrphanage = container.resolve(OrphanageListService);   
        const orphanages = await listOrphanage.execute();  
        return response.json(OrphanageView.renderMany(orphanages));
    }
    async show(request :Request, response :Response) :Promise<Response>{
        const {id} = request.params;
        const showOrphanage = container.resolve(OrphanageGetService);   
        const orphanage = await showOrphanage.execute(id);   
        return response.json(OrphanageView.render(orphanage));
    }
    async create(request :Request, response :Response) :Promise<Response>{
        const { name, latitude, longitude, about, instructions, opening_hours, open_on_weekends } = request.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required(),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required()
        });
        
        await schema.validate({
            name, 
            latitude, 
            longitude, 
            about, 
            instructions, 
            opening_hours
        },{
            abortEarly: false
        });

        const booleanOpenOnWeekends: boolean = open_on_weekends == 'true';

        const createOrphanage = container.resolve(OrphanageCreateService);
    
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
           return { path: image.filename } 
        });

        const orphanage = await createOrphanage.execute({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: booleanOpenOnWeekends,
            images: images
        });   

        return response.json(OrphanageView.render(orphanage));
    }
}

