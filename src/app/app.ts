import express,{Application,Request,Response} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { UserRoutes } from './modules/user/user.route'
const app:Application = express()

dotenv.config()
app.use(express.json())
app.use(cors())

app.use('/api',UserRoutes)
app.get('/health',(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:'working'
    })
})

export default app
