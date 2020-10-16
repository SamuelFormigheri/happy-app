import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction} from 'express';
import { errors } from 'celebrate';
import { ValidationError } from 'yup';
import 'express-async-errors';
import cors from 'cors';

import routes from './index';

import '@shared/infra/database';
import '@shared/infra/container';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from '../middlewares/rateLimiter';

const app = express();
app.use(rateLimiter);
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.persistantDirectory));

app.use("/", routes);

app.use(errors());
//Tratativa de erros global
interface IValidationError{
    [key: string] : string[];
}
app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    if(err instanceof ValidationError){
       let errors: IValidationError = {};

       err.inner.forEach(error => {
           errors[error.path] = error.errors
       });

       return response.status(400).json({
        status: 'error',
        message: 'Internal server error.',
        errors
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});

app.listen(3333);