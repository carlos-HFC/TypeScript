import { Router } from 'express'

import UserController from './controllers/UserController'

const routes = Router()

routes.get('/user', UserController.index) 
routes.post('/user', UserController.create) 

export default routes