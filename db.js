import mongoose from 'mongoose';

// PLEASE EDIT YOUR MONGO DB CONNECTION HERE
// YOU CAN FIND SAMPLE COLLECTION at mongodb_collections folder
const mongoURL = "mongodb://localhost:27017/SocialMedia";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});

export default mongoose;
