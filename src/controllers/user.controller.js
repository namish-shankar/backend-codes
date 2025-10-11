import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// const registerUser= asyncHandler(async(req,res)=>{
//      return res.status(200).json({
// message:"OK"
//     });
// });

const registerUser = asyncHandler(async (req, res) => {
  //get user details form frontend
  //validation- not empty 
  //check if user already exists:username and email se
  //check for images,check for avatar
  // if available, upload them to cloudinary,avatar
  //create user object(mongo db me data bhejne ke liye)-create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullName, email, username, password } = req.body//destructuring the response
  // console.log("email: ", email);

  //   if(fullName==="")
  // {
  //   throw new ApiError(400,"full name is required")
  // }
  // if stateemnt sbke liye likhne se better:
  if (
    [fullName, email, username, password].some((field) =>
      !field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are mandatory")
  }
  //sbke liye ek sath check krliya
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists")
  }
  //? makes it optional , that hoga to hi proceed warna skip, (DOES NOT LET IT CRASH)
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // console.log("req.body:", req.body);
  // console.log("req.files:", req.files);
  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length >0){
    coverImageLocalPath=req.files.coverImage[0].path

  }

  if (!avatarLocalPath)//avatar local apth pe nahi hai
  {
    throw new ApiError(400, "avatar file is required")
  }

  //uploading on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!avatar) {
    throw new ApiError(400, "avatar file is required")
  }


  const user = await User.create({

    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )//excluded psw and ref token 

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user")

  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "user registered successfully ")
  );
})


// some new things:
//json se files nahi bhej skte isliye form data use krte on postman 
//database se baat krte time await use kra
export { registerUser };
