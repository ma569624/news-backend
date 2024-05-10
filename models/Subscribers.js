const mongoose = require("mongoose");

const SubscribersSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  Number: {
    type: Number,
    require: false,
  },
  SubscriberDate: {
    type: Date,
    default: new Date(),
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  ipaddres: {
    type: String,
    require: false,
  },
});

const WebsiteHitsSchema = new mongoose.Schema({
  hits: {
    type: Number,
    require: false,
  },
});

const Subscribers = mongoose.model("Subscriber", SubscribersSchema);
const WebsiteHit = mongoose.model("WebsiteHit", WebsiteHitsSchema);
module.exports = {Subscribers, WebsiteHit};
