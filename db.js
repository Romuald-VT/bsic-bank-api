const mongoose = require('mongoose')


const dbConnection = async()=>{

    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("connected to the database !")
    }
    catch(error)
    {
        console.log('error: '+error.message)
    }
}

module.exports = {dbConnection}