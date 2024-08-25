const express = require("express");
const cors = require("cors");
var morgan = require('morgan')
require("dotenv").config();
const app = express();

const connectDB = require("./app/config/connect");

const nodemailer = require("nodemailer");
const SMTPServer = require("smtp-server").SMTPServer;
const parser = require("mailparser").simpleParser;

// Define a custom token for the timestamp
morgan.token('timestamp', function () {
  return new Date().toISOString();
});

app.use(require('./app/utils/AppModel.manger'))
app.use(morgan(":method :url :status :response-time ms - :res[content-length] :timestamp"))


  
const PORT = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({msg: "I am live"});
});

const AppRouter = require('./app/utils/AppRouter.manger')
app.use("/api", AppRouter);


app.use("/image", express.static("upload/images"));
app.use("/images", express.static("upload/images"));

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running at http://${host}:${PORT}`);
    });
  } catch (error) {
    console.log(error); 
  }
};

// new setups 2

// const server = new SMTPServer({
//   onData(stream, session, callback) {
//     parser(stream, {}, (err, parsed) => {
//       if (err) console.log("Error:", err);

//       console.log(parsed);
//       stream.on("end", callback);
//     });
//   },
//   disabledCommands: ["AUTH"],
//   disableReverseLookup: true,
//   logger: false,
//   secure: false,
//   hideSTARTTLS: true,
//   hide8BITMIME: true,
//   hidePIPELINING: true,
//   hideSMTPUTF8: true,
// });

// server.listen(25)
// server.listen(25, "89.116.20.142");
// insertYouTubeData();

// // Create a transporter object using SMTP
// const transporter = nodemailer.createTransport({
//   host: "thirdeyeworldnews.com",
//   port: 25, // Your SMTP server's port (usually 25)
//   secure: false, // true for 465, false for other ports
//   ignoreTLS: true, // Disable TLS as per your server's configuration
//   debug: true, // Enable debugging
// });

// // Setup email data
// const mailOptions = {
//   from: "info@thirdeyeworldnews.com", // sender address
//   to: "ms569624@gmail.com", // list of receivers
//   subject: "test", // Subject line
//   text: "Hello world!", // plain text body
//   html: "<b>Hello world!</b>", // html body
// };

// // Send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log("Message sent: %s", info.messageId);
// });

start();
