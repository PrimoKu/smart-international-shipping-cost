const express = require('express');
const connectDb = require('./configs/dbConnection');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const socketIo = require('socket.io');
const { registerUserSocket, unregisterUserSocket } = require('./socketManager');

require("dotenv").config();

connectDb();
const app = express();
const server = http.createServer(app);
const port = process.env.LocalHostPort;

app.set('trust proxy', true);

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors(corsOptions));
app.use(express.static('node_modules'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('12345678'));
app.use(upload.array());

app.use('/api/users', require("./routes/UserRoutes"));
app.use('/api/shipments', require("./routes/ShipmentRoutes"));
app.use('/api/orders', require("./routes/OrderRoutes"));
app.use('/api/groupOrders', require("./routes/GroupOrderRoutes"));
app.use('/api/notifications', require("./routes/NotificationRoutes"));



// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
let userSockets = {};

io.on('connection', (socket) => {

    socket.on('register', userId => {
        registerUserSocket(userId, socket);
    });

    socket.on('disconnect', () => {
        unregisterUserSocket(socket);
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});