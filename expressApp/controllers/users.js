
const usersRepository = require ('../repositories/users');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');
const {createJwt} = require('../utils/jwtHelper');
const {compareWithHashedPassword}= require('../utils/passwordHelper');
        
//@desc Create new user
//@route Post/api/users
//@access Public
const createUsers = asyncHandler( async (req,res,next)=>{
    const {first_name,last_name,password,dob,address,place,city,district,state,email,phone,user_name} = req.body ;
    const users = await usersRepository.getUserByUsername(user_name);
    if(users&& users.length>0){
        return next(new ErrorResponse(`${user_name} already taken`,400));
    }
    const userid = await 
    usersRepository.createUsers(first_name,last_name,password,dob,address,place,city,district,state,email,phone,user_name);
    const token = createJwt(userid);
    if(userid){
    res.status(201).json({ success: true, data :{
        message: " User created successfully ",
        token : token,
        user_name : user_name,
        ID :userid
    }
    })
    } next()
});

const login = asyncHandler(async(req,res,next)=>{
const{user_name,password }=  req.body;
const users = await usersRepository.getUserByUsername(user_name);
if(!users||users.length ==0){
    return next(new ErrorResponse('Invalid credentials', 400));
}
const user = users[0];
const isValid = compareWithHashedPassword(password,user.password);
if(isValid){
    const token =  createJwt(user.id);
    return res.status(200).json({message: "Logged in successfully",user:{
        name:user.user_name,ID:user.id
        } ,
        token : token
    })}
next(new ErrorResponse('Invalid credentials',400))}
);

module.exports ={
    createUsers, login
}; 