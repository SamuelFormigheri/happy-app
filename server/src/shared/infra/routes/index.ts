import { Router } from 'express';

import usersRouter from '@modules/infra/routes/User/users.routes';
import passwordRouter from '@modules/infra/routes/User/Password/password.routes';
import profileRouter from '@modules/infra/routes/User/Profile/profile.routes';
import sessionsRouter from '@modules/infra/routes/User/Session/sessions.routes';
import orphanagesRouter from '@modules/infra/routes/Orphanage/orphanages.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/orphanages',orphanagesRouter);

export default routes;