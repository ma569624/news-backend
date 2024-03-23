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
// const ApradhJagatrouter = require('./routes/Apradhjagat');
const BlogRouter = require('./routes/Blog');
const categoriesRouter = require('./routes/Category');
const HomeDisplayRouter = require('./routes/HomeDisplay');

// const multer = require('multer');
const RajiyoRouter = require('./routes/Rajiya');
const VotPollRouter = require('./routes/votpoll');
const {RashifalRouter, JyotishRouter} = require('./routes/Rashifal');
const AdvertRouter = require('./routes/Advert');
const ColorsRouter = require('./routes/Colors');
const TeamRouter = require('./routes/Team');
const AddressRouter = require('./routes/Address');
const RulesRouter = require('./routes/Rules');
const FounderRouter = require('./routes/Founder');

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


app.use("/api", BlogRouter);
app.use("/api", TeamRouter);
app.use("/api", RashifalRouter);
app.use("/api", JyotishRouter);
app.use("/api", AdvertRouter);
app.use("/api", VotPollRouter);
app.use("/api", ColorsRouter);
app.use("/api", AddressRouter);
app.use("/api", RulesRouter);
app.use("/api", FounderRouter);
app.use("/api", HomeDisplayRouter);
app.use("/api", RajiyoRouter);
app.use("/api", categoriesRouter);
app.use("/api", signuprouter);
app.use("/api", shubhkamnarouter);
app.use("/api", Badikhabarrouter);
app.use("/api", JaraIdharroute);
// app.use("/api", ApradhJagatrouter);
app.use("/api", Toplinksrouter);
app.use("/api", Loginrouter);

const fs = require("fs")
const path = require("path")
const pathToIndex = path.join(__dirname, "build/index.html")
app.get("/", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  const pageTitle = "Homepage - Welcome to my page"
  const updated = raw.replace("__PAGE_META__", `<title>${pageTitle}</title>`)
  res.send(updated)
  
})
//
app.use(express.static(path.join(__dirname, "build")))
app.get("*", (req, res) => {
    console.log('hit'); // Log a message when the wildcard route is hit
    res.sendFile(path.join(__dirname, "build/index.html"));
  });
  



// app.get('/meta', (req, res) => {
//     // Your data for meta tags
//     const metaData = {
//       title: "Your Page Title",
//       description: "Your page description",
//       ogTitle: "Your Open Graph Title",
//       ogDescription: "Your Open Graph Description",
//       ogImage: "URL to your Open Graph Image"
//     };
  
//     // Constructing the HTML with dynamically added meta tags
//     const html = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="utf-8" />
//         <title>${metaData.title}</title>
//         <meta name="description" content="${metaData.description}" />
//         <meta property="og:title" content="${metaData.ogTitle}" />
//         <meta property="og:description" content="${metaData.ogDescription}" />
//         <meta property="og:image" content="${metaData.ogImage}" />
//       </head>
//       <body>
//         <h1>Welcome to Your Website</h1>
//         <!-- Your HTML content goes here -->
//       </body>
//       </html>
//     `;
  
//     res.send(html);
//     // res.status(200).json(html);

//   });

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
