import express from 'express'
import { UserControllers } from './user.controller'
import { UserServices } from './user.service'
const router = express()

router.post('/users',UserControllers.createUser).get('/users',UserControllers.getAllUser).get('/users/:userId',UserControllers.getSingleUser).put('/users/:userId',UserControllers.updateUser).delete('/users/:userId',UserControllers.deleteUser).put('/users/:userId/orders',UserControllers.updateOrder).get('/users/:userId/orders',UserControllers.orderByUserId).get('/users/:userId/orders/total-price',UserControllers.calculatePrice)

export const UserRoutes = router