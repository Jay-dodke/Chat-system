//connect express
const express = require("express");
const app = express();

// Method connect
const methodOverride = require("method-override");
// Connect to MongoDB
const mongoose = require("mongoose");
// end connecting Monagosh here
const Chat = require("./models/chat");
// node js module path
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); // ejs set ki h ab css set kerge
app.use(express.static(path.join(__dirname, "public"))); // connect css 
app.use(express.urlencoded({extended: true})); // parse data
app.use(methodOverride("_method"));
//public folder ke andar se files dikhane ki permission deti hai.

// -------------- node js path end here ------------

// requair chat connction Start here
const chat = require("./models/chat.js");
// end here to chat connction

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
let chat1 = new chat({
  from: "arthur",
  to: "oliver",
  msg: "Fancy a cuppa later, mate?",
  created_at: new Date(),
});

chat1.save().then((res) => {
  // console.log(res);
});

//------------------END CHAT SYSTEM HERE -----------------
// **
// -------- Start express rounging proccess ----------
app.get("/", (req, res) => {
  res.send("home is working ");
});

// new routs
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});
// end here new route
app.post("/chats", (req, res) => {
  let {from, to, msg} = req.body;
  let newChat = new chat({
    from,
    to,
    msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((savedChat) => {
      console.log("Chat was saved:", savedChat);
      res.redirect("/chats"); // or res.send("Working") if you prefer
    })
    .catch((err) => {
      console.error("Failed to save chat:", err);
      res.status(500).send("Failed to save chat.");
    });
});

// edit route

app.get("/chats/:id/edit", async (req, res) => {
  let {id} = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", {chat});
});
// ------------------- END EDIT ROUTE ---------------------
// Update Route
app.put("/chats/:id", async (req, res) => {
  let {id} = req.params;
  let {msg: newMsg} = req.body;
  let updatedchat = await Chat.findByIdAndUpdate(
    id,
    {msg: newMsg},
    {runValidators: true, new: true}
  );
  console.log(updatedchat);
  res.redirect("/chats");
});
//------------------------------------ END UPDATE ROUTE HERE -----------------------------------------
// -------------------------DELETE / DESTROY CHATS HERE -----------------------------------------
app.delete("/chats/:id", async (req, res) => {
  let {id} = req.params;
  let deltedChat = await Chat.findByIdAndDelete(id);
  console.log(deltedChat);
  res.redirect("/chats");
});

// ------------------------- END DELETE / DESTROY CHATS HERE --------------------------------------
// Start here *Chats* route
app.get("/chats", async (req, res) => {
  let chats = await chat.find();
  // console.log(chats);
  res.render("index.ejs", {chats});
});
// Chat routs end here
app.listen(8080, () => {
  console.log("Server running on 8080 ");
});
