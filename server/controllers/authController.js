import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).josn({ message: "user already exist" });
    }

    const user = await User.create({ name, email, password });
    generateToken(res, user._id);

    return res.status(201).json({
      message: "User Created Successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup Failed", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All Field are Required" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    generateToken(res, user._id);
    res
      .status(200)
      .json({
        message: "Login Successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};


export const logout =(req,res)=>{
        res.cookie("token","",{httpOnly:true,expires:new Date(0)});
        res.status(200).json({message:"Logged out Successfully"}); 
}

export const getUser = async(req,res)=>{
    try {
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json({message:"user fetched successfully",user})
    } catch (error) {
        res.status(500).json({message:"Error in fetching user"});
    }
}
