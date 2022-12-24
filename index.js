require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const mongoose = require('mongoose');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const profileEditRoutes = require("./routes/profileEdit");
const passwordResetRoutes = require("./routes/passwordReset");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/profileEdit", profileEditRoutes);
app.use("/api/password-reset", passwordResetRoutes);



app.get('/', function (req, res) {
    res.send(`Welcome to Profile Editor`);
  })


//port
const PORT=process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`)
    })
}).catch((error)=>{
    console.log(error);
})


// const connect = async () => {
//     try {
//       await mongoose.connect(process.env.MONGO_URI,{
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useCreateIndex: true
//     });
//       console.log("Connected to mongoDB.");
//     } catch (error) {
//       throw error;
//     }
//   };
//   mongoose.connection.on("disconnected", () => {
//     console.log("mongoDB disconnected!");
//   });

//   app.listen(PORT, ()=>{
//     connect();
//     console.log(`Server is running on ${PORT}`)
// })