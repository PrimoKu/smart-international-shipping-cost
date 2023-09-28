const express = require('express');
// const connectDb = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const http = require('http');
const multer = require('multer');
const upload = multer();

require("dotenv").config();

// connectDb();
const app = express();
const port = 8080;

app.set('trust proxy', true);
app.use(express.static('node_modules'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/TestRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});