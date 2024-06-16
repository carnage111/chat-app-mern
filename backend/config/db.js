import mongoose from 'mongoose'

export async function db(){
    try{
        const db = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connected: ${db.connection.host + ':' + db.connection.port + '/' + db.connection.name}`);
    } catch(error){
        console.log(error.message);
        process.exit(1)
    }
}