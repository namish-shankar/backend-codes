import { asyncHandler}   from "../utils/asyncHandler.js";
const registerUser= asyncHandler(async(req,res)=>{
     return res.status(200).json({
message:"OK"
    });
});

// const registerUser=asyncHandler(async(req,res)=>{
    //get user details form frontend
    //validation- not empty 
    //check if user already exists:username and email se
    //check for images,check for avatar
    // if available, upload them to cloudinary,avatar
    //create user object(mongo db me data bhejne ke liye)-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

// const {fullname,email,username ,password}=  req.body
// console.log("email: ",email)



//})

export {registerUser};
