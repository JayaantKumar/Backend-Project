import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const resgisterUser = asyncHandler(async(req, res) => {
    // get user details from frontend
    // Validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create enrty in db
    // remove password and refresh token field from response
    // check for user creation
    // return res



    const {fullname, email, username, password} = req.body
   // console.log("email ", email);

    // begginner way to if cond
     /*     if(fullname === ""){
        throw new ApiError(400, "fullname is required")
    } */

    if(
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    // check if user already exists: username, email
    // ($or) are the operators used to check value in objects
    const existedUser = await User.findOne({
        $or: [{username},{email}]
    }) 
    
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

        // upload them to cloudinary, avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
   // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

       // create user object - create enrty in db
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

        // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went while regitering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registerd succesfully")
    )
})

export{resgisterUser}