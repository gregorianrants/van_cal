require("dotenv").config();
const db = require("./model/db");
const express = require("express");
const jobs = require("./routes/jobsRoute");
const auth = require("./routes/authRoute");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path");
const errorHandlers = require("./controllers/errorControllers");
const AppError = require('./utils/appError')

app.use(cors());

/*
const { Server } = require("socket.io");

const {sockets} = require('./sockets')



const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }});

io.on('connection',(socket)=>{
    console.log('new client connected')
    sockets.push(socket)
})

*/

app.use(express.static(path.join(__dirname, "../build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/jobs", jobs);
console.log(auth)
app.use("/api/v1/auth", auth);

app.all("*", (req, res, next) => {
  next(new AppError(`Cant't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandlers.handleValidationError);
app.use(errorHandlers.handleNotFoundError);
app.use(errorHandlers.handleError);

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
