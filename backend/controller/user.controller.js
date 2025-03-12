
const User  = require("../model/user.model");
const z = require("zod");
const bcrypt = require("bcrypt");
const generateTokenAndSaveInCookies = require("../jwt/token");

const userSchema = z.object({
    email:z.string().email({message:"Invalid email address"}),
    username:z.string().min(3,{message:"Username atleast 3 character long"}),
    password:z.string().min(6,{message:"Password atleast 6 character long"})

})

const register =async (req,res) =>{

    try {
        const {username,email,password} = req.body;
        
        if(!email || !username || !password){
            return res.status(400).json({message:"All fields are required"});
        }
    
        const validation = userSchema.safeParse({email,username,password});
        if(!validation.success){

            const errorMessage = validation.error.errors.map((err) => err.message)
           return  res.status(400).json({error:errorMessage});

        }


        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User Already exists"});
        }

        const hashPassword = await bcrypt.hash(password,10)

        const newUser = new User({username,email,password:hashPassword});
        await newUser.save();

        if(newUser){
            const token = await generateTokenAndSaveInCookies(newUser._id, res);
            res.status(201).json({
                message: "User Registered Successfully",
                newUser,
                token
            });
            
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error in registering User"})
    }
}
const login = async (req,res) =>{
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user = await User.findOne({email:email}).select("+password"); 
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({message:"Invalid email or password"})
        }

        const token = await generateTokenAndSaveInCookies(user._id,res);

        res.status(200).json({message:"User login successfully",user,token});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Error Logging User"});
    }

    
        
}

const logout = (req,res) =>{
    try {
        res.clearCookie("jwt",{
            path:'/'
        })
        res.status(200).json({message:"User log out successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error Logging out User"});
    }
}

module.exports = {register,login , logout}