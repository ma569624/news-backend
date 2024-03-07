const mongoose = require('mongoose')
const uri = process.env.URI || 'mongodb+srv://manishfrontenddeveloper:b734gP6UU5Pzalez@news.kbbhazv.mongodb.net' ;



const DB_Connection = async () => {
    try {
        await mongoose.connect(uri);
        console.log('database connected')
    } catch (error) {
        console.log(`database not connected: ${error}`)
    }
}

module.exports = DB_Connection;