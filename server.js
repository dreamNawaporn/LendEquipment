//หลัก
const express = require("express");
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//อิมพอร์เข้ามา
const userRouter = require('./routers/User.route');
const BorrowRoute = require('./routers/Borrow.route');
const EquipmentRoute = require('./routers/Equipment.Route');
require("dotenv").config();

//เรียกใช้
const PORT = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use(cors())

server.get("/", (req, res) => {
  res.send("Hello World!");
});
server.use('/users', userRouter);
server.use('/borrow',BorrowRoute);
server.use('/equipment',EquipmentRoute);

server.listen(PORT, () => {
  console.log("server listening on port " + PORT + " localhost");
});
