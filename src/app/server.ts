import mongoose from 'mongoose'
import app from './app'


async function main(){
    try {
        await mongoose.connect(process.env.DB_URI as string )
        console.log(`DB connected ${mongoose.connection.host}`);
        
        app.listen(process.env.PORT,()=>{
            console.log(`server running in ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}
main()