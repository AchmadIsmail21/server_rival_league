import db from "../models/index.js";
import { request, response } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {v4 as uuidv4} from 'uuid'

const User = db.user;
const Op = db.sequelize.Op;

export const registerUser = async (req = request, res = response) => {
    try {
        // create User
        const {
            email,
            first_name,
            last_name,
            phone_number,
            password,
            birth_date
        } = await req.body;
        const salt = await bcrypt.genSalt();
        const uuid = uuidv4();
        // const user = {
        //     email: req.body.email,
        //     fullName: req.body.fullName,
        //     no_telpon: req.body.no_telpon,
        //     password: await bcrypt.hash(req.body.password, salt)
        // }
        
        const passwordHash = await bcrypt.hash(password, salt)
        const createUser = await User.create({
            id: uuid,
            email,
            first_name,
            last_name,
            phone_number,
            password: passwordHash,
            birth_date
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
        // const userPassword = await User.findOne({where : {
        //     password: password
        // }});

        if(!userEmail) {
            return res.status(404).json({
                status: false,
                message: "email belum terdaftar"
            });
        }
        console.log(userEmail.password)
        const isMatch = await bcrypt.compare(password, userEmail.password);
        if(!isMatch) {
            return res.status(404).json({
                status: false,
                message: "password salah"
            });
        }
        const {JWT_SECRET} = process.env
        const token = jwt.sign({id: userEmail.id, email: userEmail.email}, JWT_SECRET)

        delete userEmail.password

        return res.status(200).json({
            status: true,
            message: "berhasil login",
            token: token
        });


    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
}

export const getUserById = async (req = request, res = response) => {
    try {
        const {id} = await req.params;
        const findUserId = await User.findOne({where: {id: id}})

        return res.status(200).json({
            success: true,
            message: "User dengan id tersebut ditemukan",
            user: findUserId
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        });
    }
}