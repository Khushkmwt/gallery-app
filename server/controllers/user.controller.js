import {User} from '../models/user.model.js'
import {asyncHandler} from '../utills/asyncHandler.js'
import {ApiError} from '../utills/ApiError.js'
import jwt from 'jsonwebtoken'


const signupUser = asyncHandler(async(req,res) =>{
    const {username,email,password} = req.body
     if (!username || !email || !password) {
        throw new ApiError(400,"username,email,password all field are required")
     }
     const isUserExist = await User.findOne({email})
     if (isUserExist) {
        throw new ApiError(400,"user already exist")
     }
    const user = await User.create({
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    
    res.json({ message: "User created successfully", data: createdUser });
})
const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body
    if (!email || !password) {
        throw new ApiError(400,"email and password required")
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(400,"user not found")
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }
    console.log(user);

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    // Set cookies and redirect to the home page
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    res.json({ message: "User is logged in successfully", data: loggedInUser });
});

const logoutUser = asyncHandler(async(req,res) =>{
    const {refreshToken} = req.cookies
    if (!refreshToken) {
        throw new ApiError(400, "Please login first");
    }
    const user = await User.findOne({ refreshToken });
    if (!user) {
        throw new ApiError(400, "Please login first");
    }
    await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

     res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "Logout successful" });
})
const generateAccessAndRefereshTokens = async(userId) =>{
    
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
 const checkLoginStatus = asyncHandler(async(req, res) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            return res.status(200).json({ isLoggedIn: false });
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            return res.status(200).json({ isLoggedIn: false });
        }
    
        return res.status(200).json({ isLoggedIn: true });
    } catch (error) {
        return res.status(200).json({ isLoggedIn: false });
    }
    
});
export {
    signupUser,
    loginUser,
    logoutUser,
    checkLoginStatus
}