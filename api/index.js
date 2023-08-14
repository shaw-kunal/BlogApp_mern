const express = require("express");
const app = express();
const multer = require('multer');
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const categoryRoute = require("./routes/categories")
const commentRoute = require("./routes/comment");
const cors = require('cors'); // Require the cors package
const path = require("path");



dotenv.config();

//manage to send json object
app.use(express.json());
app.use(cors());
// make the images folder public
app.use("/images",express.static(path.join(__dirname,"/images")))





// connect to monodgodb 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,

  }).then(console.log("Connected to Mongo DB"))
  .catch((err)=> console.log(err))

  ;
  
  // Monitor MongoDB connection status and handle disconnections
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Trying to reconnect...');
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Reconnected to MongoDB");
  }).catch((err) => {
    console.error("Reconnection to MongoDB failed:", err);
  });
});




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/'); // Destination folder where the uploaded files will be saved.
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name); // File naming convention (you can change it as per your needs)
  }
})

  const upload = multer({ storage: storage });
  app.post('/api/upload',upload.single("file"), (req,res)=>{
    res.status(200).json("file has beed Uploaded");
  });

  // routes
  app.use("/api/auth" ,authRoute);
  app.use("/api/user" ,userRoute);
  app.use("/api/post" ,postRoute);
  app.use("/api/catagroy" ,categoryRoute);
  app.use("/api/comment",commentRoute);
  
app.listen("5000",()=>{
    console.log("backend is running");
})