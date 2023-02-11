import jwt from "jsonwebtoken"
import { request, response } from "express"

//Authorization
export const verifyToken = async (req = request, res = response, next) => {
    try {
        let token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access Denied")
        }

        if(token.startsWith("Bearer")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next()
    } catch (error) {
        return res.status.json({
            success: false,
            error: error.message
        })
    }
}