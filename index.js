const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const connectDB = require("./db/connect")
// const homerouter = require('./routes/homeroute');
const shubhkamnarouter = require('./routes/Shubhkamna');
const signuprouter = require('./routes/signup');
const Loginrouter = require('./routes/login');
const Toplinksrouter = require('./routes/toplinks');
const Badikhabarrouter = require('./routes/badikhabar');
const JaraIdharroute = require('./routes/Jaraidhar');
const ApradhJagatrouter = require('./routes/Apradhjagat');
const BlogRouter = require('./routes/Blog');
const categoriesRouter = require('./routes/Category');
const HomeDisplayRouter = require('./routes/HomeDisplay');
const ColorsRouter = require('./routes/Colors');
// const ServiceRouter = require('./routes/serviceroute');
const PORT = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/', (req, res) => {
    res.send("I am live");
});
const fs = require('fs');

// Define the directory path
const directoryPath = './upload/images';
const path = require('path');

// Read the contents of the directory
// fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//         console.error('Error reading directory:', err);
//         return;
//     }
    
//     // Log the list of files in the directory
//     console.log('Files in the directory:', files);
// });

// fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//         console.error('Error reading directory:', err);
//         return;
//     }

//     // Array to hold file information
//     const fileInfoArray = [];

//     // Function to get file information
//     const getFileInformation = (fileName) => {
//         return new Promise((resolve, reject) => {
//             const filePath = path.join(directoryPath, fileName);
//             fs.stat(filePath, (err, stats) => {
//                 if (err) {
//                     reject(err);
//                     return;
//                 }
//                 const fileInfo = {
//                     name: fileName,
//                     path: filePath,
//                     size: stats.size,
//                     modifiedAt: stats.mtime
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     };

//     // Iterate through each file and get its information
//     Promise.all(files.map(fileName => getFileInformation(fileName)))
//         .then(fileInfoArray => {
//             // Log the array of file information
//             console.log('File Information Array:', fileInfoArray);
//         })
//         .catch(error => {
//             console.error('Error getting file information:', error);
//         });
// });


const multer = require('multer');
const RajiyoRouter = require('./routes/Rajiya');
const VotPollRouter = require('./routes/votpoll');
const {RashifalRouter, JyotishRouter} = require('./routes/Rashifal');
const AdvertRouter = require('./routes/Advert');

// const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

const storage = multer.diskStorage({
    // destination: './upload/images',
    destination: function (req, file, cb) {
        //where to store the file
        cb(null, './uploads');
      },
    filename: (req, file, cb) => {
        // return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
       cb(null, file.originalname);
        // return cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1000000
    // }
})

app.post('/upload', upload.array('files'), (req, res) => {
    try {
        console.log(req.files); // Array of uploaded files
        res.send('Files uploaded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading files');
    }
});
app.use("/api", BlogRouter);
app.use("/api", RashifalRouter);
app.use("/api", JyotishRouter);
app.use("/api", AdvertRouter);
app.use("/api", VotPollRouter);
app.use("/api", ColorsRouter);
app.use("/api", HomeDisplayRouter);
app.use("/api", RajiyoRouter);
app.use("/api", categoriesRouter);
app.use("/api", signuprouter);
app.use("/api", shubhkamnarouter);
app.use("/api", Badikhabarrouter);
app.use("/api", JaraIdharroute);
app.use("/api", ApradhJagatrouter);
app.use("/api", Toplinksrouter);
app.use("/api", Loginrouter);


app.use('/image', express.static('upload/images'));


const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running at http://${host}:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()
