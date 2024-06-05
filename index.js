const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const connectDB = require("./db/connect");
const signuprouter = require("./routes/signup");
const Loginrouter = require("./routes/login");
const Toplinksrouter = require("./routes/toplinks");
const Taglineroute = require("./routes/Tagline");
const BlogRouter = require("./routes/Blog");
const categoriesRouter = require("./routes/Category");

const SMTPServer = require("smtp-server").SMTPServer;
const parser = require("mailparser").simpleParser

const VotPollRouter = require("./routes/votpoll");
const AdvertRouter = require("./routes/Advert");
const ColorsRouter = require("./routes/Colors");
const TeamRouter = require("./routes/Team");
const AddressRouter = require("./routes/Address");
const RulesRouter = require("./routes/Rules");
const FounderRouter = require("./routes/Founder");
const YoutubeRouter = require("./routes/youtube");
const Subscribers = require("./routes/Subscribers");

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
  res.send("I am live");
});

app.use("/api", BlogRouter);
app.use("/api", TeamRouter);
app.use("/api", AdvertRouter);
app.use("/api", VotPollRouter);
app.use("/api", ColorsRouter);
app.use("/api", AddressRouter);
app.use("/api", RulesRouter);
app.use("/api", FounderRouter);
app.use("/api", categoriesRouter);
app.use("/api", signuprouter);
app.use("/api", Taglineroute);
app.use("/api", Toplinksrouter);
app.use("/api", Loginrouter);
app.use("/api", YoutubeRouter);
app.use("/api", Subscribers);

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




const server = new SMTPServer({
  onData(stream, session, callback) {
    parser(stream, {}, (err, parsed) => {
      if (err)
        console.log("Error:" , err)
      
      console.log(parsed)
      stream.on("end", callback)
    })
    
  },
  disabledCommands: ['AUTH']
});

server.listen(25, "89.116.20.142")
// insertYouTubeData();

start();
