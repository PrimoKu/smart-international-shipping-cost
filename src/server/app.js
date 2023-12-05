const express = require('express');
const connectDb = require('./configs/dbConnection');
const cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
const socketIo = require('socket.io');
const { registerUserSocket, unregisterUserSocket } = require('./socketManager');
const User = require("./models/User");
const passport = require('passport');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

connectDb();
const app = express();
const server = http.createServer(app);
const port = process.env.LocalHostPort;

app.set('trust proxy', true);
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

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

app.use(session({ 
  secret: 'your_secret_key', 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));
app.use(express.static('node_modules'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('12345678'));
app.use(upload.array());

app.use('/api/users', require("./routes/UserRoutes"));
app.use('/api/shipments', require("./routes/ShipmentRoutes"));
app.use('/api/payments', require("./routes/PaymentRoutes"));
app.use('/api/orders', require("./routes/OrderRoutes"));
app.use('/api/groupOrders', require("./routes/GroupOrderRoutes"));
app.use('/api/notifications', require("./routes/NotificationRoutes"));

app.post('/api/auth/google', async (req, res) => {
  console.log(req.body.token);
  const token = req.body.token;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const userObject = ticket.getPayload();
    console.log(userObject);
    let user = await User.findOne({ email: userObject.email });
    if (!user) {
        req.session.oauthRegistrationData = {
            google_login: true,
            email: userObject.email,
            name: userObject.name,
        };
        res.json({ isNewUser: true });
    } else {
        const accessToken = jwt.sign({
            user: {
                name: user.name,
                email: user.email,
                id: user.id,
            },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 10000000 }
      ); 
      
      res.cookie('jwt', accessToken, {
          httpOnly: true,
          maxAge: 10000000,
          signed: true,
          sameSite: 'Strict'
      });
      res.status(200).json({ isNewUser: false, user: user, token: accessToken });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}
});

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