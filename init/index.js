const mongoose =require("mongoose");
const initData= require("./data.js");
const Listing = require("../models/listing.js");

main().then(() =>{
    console.log("connect");
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/StayExplorer');
}


 const initDB = async () =>{
  await  Listing.deleteMany({});
  initData.data=initData.data.map((obj) =>({...obj,owner:"66dc38c5729cb8784ab5b488"
  }))
  await  Listing.insertMany(initData.data);
   console.log("data was save baby");
 };

 initDB();

