const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const userRepo = require("../repositories/UserRepository");
const { UserRoleList } = require("../enums/UserRoleEnums");

class UserController {

    //@desc Register a user
    //@route POST /api/users/register
    //@access public
    registerUser = asyncHandler(async (req, res) => {
        const { name, email, password, role } = req.body;
        console.log(req.body);
        let user;
        try {
            user = await User.findOne({ email });
            if(user) {
                res.status(400).json({ email_msg: "Email is already taken!" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("Hashed Password: ", hashedPassword);
            user = await User.create({ name, email, password: hashedPassword, role });
            if(user != null && user != undefined) {
                const accessToken = jwt.sign({
                    user: {
                        name: user.name,
                        email: user.email,
                        id: user.id,
                        role: UserRoleList.find(role => role.value === user.role)?.text || null,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 10000000 }
                ); 
                
                // Store token
                res.cookie('jwt', accessToken, {
                    httpOnly: true,
                    maxAge: 10000000,
                    signed: true,
                    sameSite: 'Strict'
                });
                res.status(201).json({ _id: user.id, email: user.email});
            } else {
                res.status(442).json({ message: "Create user failed!" });
            }
        } catch (error) {
            res.status(500);
            console.log(error);
            throw new Error("Server Error!");
        }
    });
    
    //@desc Login user
    //@route POST /api/users/login
    //@access public
    loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        let user;
        try {
            user = await User.findOne({ email });
            if(user && (await bcrypt.compare(password, user.password))) {
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
                res.status(200).json({ user: user, token: accessToken });

            } else {
                res.status(401).json({ message: "Invalid email or password!" });
            }
        } catch (error) {
            console.log(error);
            res.status(500);
            throw new Error("Server Error!");
        }
    });
    
    //@desc Logout user
    //@route GET /api/users/logout
    //@access private
    logoutUser = async (req, res) => {
        res.clearCookie('jwt', { 
            httpOnly: true, 
            signed: true, 
            sameSite: 'Strict',
        });
        res.status(200).json({ message: "Logged out successfully" });
    };


    //@desc Current user info
    //@route GET /api/users/current
    //@access private
    currentUser = asyncHandler(async (req, res) => {
        try {
            const user = await userRepo.getWithDetails(req.user.id);
            if(!user) {
                return res.status(404).json({ message: "User not found!" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500);
            throw new Error("Server Error!");
        }
    });

    //@desc Update user
    //@route PUT /api/users/:id
    //@access private
    updateUser = asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        try {
            if(!user) {
                res.status(404).json({ message: "User not found!" });
            }
            if (req.body.password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                req.body.password = hashedPassword;
            }
            const updatedUser = await User.findByIdAndUpdate( req.params.id, req.body, { new: true });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500);
            throw new Error("Server Error!");
        }
    });
}

module.exports = UserController;