const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req,res) => {
 try {
     //get the required fields from the user
    const {firstName,lastName,email,password} = req.body;
    //check if anything is not empty
    if(!(firstName && lastName && email && password)){
        return res.status(404).send("Please enter all the information");
    }
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).send("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
    }
    //check if the user already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.send("User already exists with the same email");
    }
    // hashing encrypt the password
    const hash = await bcrypt.hash(password,10);
    //save the user in the db
    const user = await User.create({
        firstName,
        lastName,
        email,
        password:hash,
    });
    //generate a token for the user and send it 
    //After login, the server generates a JWT and sends it to the client.
    //The client includes this token in future requests (usually in the Authorization header) 
    // to prove their identity.
    const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET, { //payload of the token jo jo cheez save karwga to verigy the user
        expiresIn: '1h'
    });
    user.token = token; // add the token to the user object
    user.password = undefined; // remove the password from the user object
    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    });
    // res.send('<h1>Welcom to Register page</h1>');
   } catch (error) {
         console.error("Error during registration:", error);
         res.status(500).send("Internal Server Error");
   }
};

exports.loginUser = async(req,res) => {
    try{
        // get the required fields from the user
        const {email,password} = req.body;
        //check if anything is not empty
        if(!(email && password)){
            return res.status(404).send("Please enter all the information");
        }
        //check if the user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send("User does not exist with the provided email");
        }
        //if user does not exist then send an error message
        //if user exists then check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).send("Invalid password");
        }
        //if password is correct then generate a token and send it to the user
        const token = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        user.token = token; // add the token to the user object
        user.password = undefined; // remove the password from the user object 
        res.status(200).json({
            message: "User logged in successfully",
            user,
            token
        });
        // res.send('<h1>Welcome to Login page</h1>');
    }catch(error){
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getUser = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      name: user.firstName + " " + user.lastName,
      email: user.email,
      _id:user._id
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

