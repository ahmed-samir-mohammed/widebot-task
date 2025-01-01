import jsend from 'jsend'
import Users from '../models/user.model.js'
import asyncWrapper from '../middlewares/asyncWrapper.js'
import { errHandeler } from '../utils/appErrorHandler.js'
import bcrypt from 'bcrypt'
import { genrateJWT } from '../utils/genrateJWT.js';


// Register Users
const register = asyncWrapper(async (req, res, next) => {
    const { fisrtName, lastName, email, password } = req.body
    const user = await Users.findOne({ email: email })
    if (user) {
        return next(errHandeler('User already exists', 'fail', 400))
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
        fisrtName,
        lastName,
        email,
        password: hashedPassword
    })
    await newUser.save();
    res.status(201).json(jsend.success("Done"))
})

// login Users
const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body
    if (!email && !password) return next(errHandeler('Email and Password is Require', 'error', 400))
    const user = await Users.findOne({ email })
    if (!user) return next(errHandeler('User not found', 'fail', 400))
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return next(errHandeler('Invalid password', 'fail', 500))
    const token = await genrateJWT({ email: user.email, id: user._id })
    res.json(jsend.success({ token: token }))
})

// Get All Userss
const getAllUsers = asyncWrapper(async (req, res) => {
    const query = req.query
    const pageNo = +query.pageNo || 1
    const pageSize = +query.pageSize || 2
    let skip = (pageNo - 1) * pageSize // => Count Of Items

    const data = await Users.find({}, { "__v": false, "password": false }).limit(pageSize).skip(skip)
    res.json(jsend.success(data))
})

// Get Single User
const getUser = asyncWrapper(async (req, res, next) => {
    const user = await Users.findById(req.params.id, { "__v": false, "password": false })
    if (!user) {
        return next(errHandeler('User not found', 'fail', 404))
    } else res.json(jsend.success(user))
})

// Update User
const updateUser = asyncWrapper(async (req, res) => {
    const user = await Users.updateOne({ _id: req.params.id }, { $set: { ...req.body } })
    return res.status(200).json(jsend.success(user))
})

// Delete User 
const deleteUser = asyncWrapper(async (req, res, next) => {
    const user = await Users.findOneAndDelete({ _id: req.params.id }).select({ "__v": false, "password": false })
    if (user) {
        return res.status(200).json(jsend.success(user))
    } else {
        return next(errHandeler("User Not Found", "error", 400))
    }
})

export {
    register,
    login,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}