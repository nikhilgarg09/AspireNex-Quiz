import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
export const SignUp = async (req, res) => {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({username});
      if(existingUser){
        return res.status(400).json({error:"usename is already taken"});
      }
      const hashedpassword = await bcrypt.hash(password,10);
      const user = new User({ username, password : hashedpassword});
      await user.save();
      const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET,{expiresIn:'10d'});
      res.status(201).json({ token });
    } catch (err) {
      res.status(400).send(err.message);
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user || !await bcrypt.compare(password, user?.password || "")) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (err) {
      res.status(400).send(err.message);
    }
}

export const getme = async (req,res)=>{
  try {
    res.send({
      _id : req.user. _id,
      username : req.user.username,
    })
  } catch (error) {
    console.log("Internal server error");
    res.status(500).send(err.message);
  }
}