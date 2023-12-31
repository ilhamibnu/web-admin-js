import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message || "Something went wrong"});
    }
}

export const getUserById = async (req, res) => {
    
    try{
        try {
            const response = await User.findOne({
                where: {
                    id: req.params.id
                }
            });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({message: error.message || "Something went wrong"});
        }

    }catch(error){
        res.status(500).json({message: error.message || "Something went wrong"});
    }
}

export const createUser = async (req, res) => {
   const {name, email, password, role} = req.body;
    if(!name || !email || !password || !role){
         return res.status(400).json({message: "Please provide all fields"});
    }
    try {
        const user = await User.findOne({where: {email}});
        if(user){
            return res.status(400).json({message: "User with this email already exists"});
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = await User.create({name, email, password: hashedPassword, role});
        res.status(200).json(newUser);
        
    } catch (error) {
        res.status(500).json({message: error.message || "Something went wrong"});
    }
}


export const updateUser = async (req, res) => {
    const {name, email, password, role} = req.body;
    if(!name || !email || !password || !role){
         return res.status(400).json({message: "Please provide all fields"});
    }
    try {
        const user = await User.findOne({where: {email}});
        if(user){
            return res.status(400).json({message: "User with this email already exists"});
        }
        const hashedPassword = await argon2.hash(password);
        const newUser = await User.create({name, email, password: hashedPassword, role});
        res.status(200).json(newUser);
        
    } catch (error) {
        res.status(500).json({message: error.message || "Something went wrong"});
    }
            
}

export const deleteUser = async (req, res) => {
    try {
        const response = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message || "Something went wrong"});
    }
                
}