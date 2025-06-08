const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const mongoose = require('mongoose');
const methodOverride = require('method-override');


// Correct way to set the views directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));




// MongoDB connection
main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Connection error:", err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');

}


// index 
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
})

app.get("/chats/new", (req, res) => {
    res.render("new.ejs")
});


app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    try {
        let chat = await Chat.findById(id);
        if (!chat) {
            return res.status(404).send("Chat not found");
        }
        res.render("edit.ejs", { chat });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


// create route
app.post("/chats", (req, res) => {
    let { from, to, message } = req.body;

    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });

    newChat
        .save()
        .then(savedChat => {
            console.log("Chat saved:", savedChat);
            res.redirect("/chats");
        })
        .catch(err => {
            console.log("Error saving chat:", err);
            res.send("Error saving chat");
        });
});

app.post("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let newMsg = req.body;

    try {
        let updateChat = await Chat.findByIdAndUpdate(
            id,
            newMsg,
            { runValidators: true, new: true }
        );
        console.log(updateChat);
        res.redirect("/chats");
    } catch (err) {
        console.log("Error:", err);
        res.send("Update failed");
    }
});

app.delete("/chats/:id",async(req,res) =>{
       let { id } = req.params;
       let delChat= await Chat.findByIdAndDelete(id);
       console.log(delChat);

       res.redirect("/chats")


});



// Route
app.get("/", (req, res) => {
    res.send("Connection established");
});

// Start the server
app.listen(8080, () => {
    console.log("Listening on port 8080");
});
