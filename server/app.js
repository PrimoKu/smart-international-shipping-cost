const express = require('express');
const connectDb = require('./configs/dbConnection');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

require("dotenv").config();

connectDb();
const app = express();
const port = 8080;

app.set('trust proxy', true);
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.static('node_modules'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('12345678'));
app.use(upload.array());

app.use('/api/users', require("./routes/UserRoutes"));
app.use('/api/orders', require("./routes/OrderRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});