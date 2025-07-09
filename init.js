const mongoose = require("mongoose");
const chat = require("./models/chat.js");
// mongo db start conection
main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
// *********** mongo Db end here ************
// ----------- start creating a chat in mongo dbs  ---------------

// sample data

let allChats = [
  {
    from: "jay",
    to: "josh",
    msg: "Hey bro!",
    created_at: new Date(),
  },
  {
    from: "arthur",
    to: "oliver",
    msg: "Fancy a cuppa later, mate?",
    created_at: new Date(),
  },
  {
    from: "george",
    to: "harry",
    msg: "Oi, you still up for footie this evening?",
    created_at: new Date(),
  },
  {
    from: "jack",
    to: "freddie",
    msg: "Had a proper laugh last night, didn’t we?",
    created_at: new Date(),
  },
  {
    from: "charlie",
    to: "oscar",
    msg: "Nipped out for a Greggs, want anything?",
    created_at: new Date(),
  },
  {
    from: "alfie",
    to: "thomas",
    msg: "That assignment was mental, bruv!",
    created_at: new Date(),
  },
];
chat.insertMany(allChats);

//------------------END CHAT SYSTEM HERE -----------------
// **
