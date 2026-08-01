const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ushasrisakinala2006:yFhnUU7ZVW0dXmdt@cluster0.dl8dkfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected Successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Failed:");
    console.error(err);
    process.exit(1);
  });