const mongoose = require('mongoose');

const uri = process.env.URI;

// const connectDB = () => {
//     console.log("connect Database");
//     return mongoose.connect(uri)
// }

const connectDB = async () => {
    try {
        await mongoose.connect(`${uri}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};


module.exports = connectDB;