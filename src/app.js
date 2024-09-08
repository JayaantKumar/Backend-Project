import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

// use mostly for middleware or configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// To allow our backend to accept json but having limited 16kb.
app.use(express.json({
    limit:"16kb"
}))

// For accepting url
app.use(express.urlencoded({
    extended: true,
    limit:"16kb"
}))

// To store images or pdf 
app.use(express.static("public"))

// To accept or store cookies from users
app.use(cookieParser())

export {app} 