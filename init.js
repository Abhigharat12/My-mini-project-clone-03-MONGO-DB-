
const Chat =require("./models/chat.js");

const mongoose = require('mongoose');
// MongoDB connection
main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Connection error:", err);
});

async function main() {
    await mongoose.connect('mongodb://localhost:27017/whatsapp');

}
const chats = require("./models/chat");

let allchats=[
  {
    from: "Abhishek",
    to: "Amit",
    message: "Hi Amit! How are you?",
    created_at: new Date()
  },
  {
    from: "Amit",
    to: "Abhishek",
    message: "I'm good! What's up?",
    created_at: new Date()
  },
  {
    from: "Abhishek",
    to: "Priya",
    message: "Are you joining the meeting?",
    created_at: new Date()
  },
  {
    from: "Priya",
    to: "Abhishek",
    message: "Yes, I'll be there in 5 mins.",
    created_at: new Date()
  },
  {
    from: "Abhishek",
    to: "Rahul",
    message: "Don’t forget the report!",
    created_at: new Date()
  },
  {
    from: "Rahul",
    to: "Abhishek",
    message: "Got it. Sending soon.",
    created_at: new Date()
  },
  {
    from: "Amit",
    to: "Priya",
    message: "Can we catch up tomorrow?",
    created_at: new Date()
  },
  {
    from: "Priya",
    to: "Amit",
    message: "Sure, lunch at 1?",
    created_at: new Date()
  },
  {
    from: "Rahul",
    to: "Priya",
    message: "Meeting rescheduled to 4 PM.",
    created_at: new Date()
  },
  {
    from: "Priya",
    to: "Rahul",
    message: "Thanks for the update!",
    created_at: new Date()
  }
]

Chat.insertMany(allchats);
