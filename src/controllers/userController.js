import db from "../models/index.js";
import { request, response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const User = db.user;
const Op = db.sequelize.Op;

export const registerUser = async (req = request, res = response) => {
    try {
        // create User
        const {
            email,
            fullName,
            no_telpon,
            password
        } = await req.body;
        // const salt = await bcrypt.genSalt();

        // const user = {
        //     email: req.body.email,
        //     fullName: req.body.fullName,
        //     no_telpon: req.body.no_telpon,
        //     password: await bcrypt.hash(req.body.password, salt)
        // }
        
        // const passwordHash = await bcrypt.hash(password, salt)
        const createUser = await User.create({
            email,
            fullName,
            no_telpon,
            password
        });

        // const createUser = await User.create(user)            
        return res.status(201).json({
            success: true,
            message: "Data berhasil dibuat",
            data: createUser
        });
        
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
}

export const loginUser = async (req = request, res = response) => {
    try {
        const {email, password} = await req.body;
        const userEmail = await User.findOne({where : {
            email: email
        }});
        const userPassword = await User.findOne({where : {
            password: password
        }});

        if(!userEmail) {
            return res.status(404).json({
                status: false,
                message: "email belum terdaftar"
            });
        }
        if(!userPassword) {
            return res.status(404).json({
                status: false,
                message: "password salah"
            });
        }

        return res.status(200).json({
            status: true,
            message: "berhasil login"
        });


    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
}