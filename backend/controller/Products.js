import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {

    try {
        let response;
        if(req.role === 'admin'){
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price'],
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });

        }else{
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price'],
                where: {UserId: req.UserId},
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }

        res.status(200).json(response);
       
    } catch (error) {

        res.status(500).json(error);
    }

}

export const getProductById = async (req, res) => {

    try {

        const product = await Product.findOne({
            where: {uuid: req.params.id},
        });

        if(!product) return res.status(404).json({message: "Product not found"});

        let response;
        if(req.role === 'admin'){
            response = await Product.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {id: product.id},
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });

        }else{
            response = await Product.findOne({
                attributes: ['uuid', 'name', 'price'],
                where: {
                    [Op.and]: [{id: product.id}, {UserId: req.UserId}],
                },
                include: [{
                    model: User,
                    attributes: ['name', 'email']
                }]
            });
        }

        res.status(200).json(response);
       
    } catch (error) {

        res.status(500).json(error);
    }

}

export const createProduct = async (req, res) => {

    const {name, price} = req.body;

    try {
        await Product.create({
            name: name,
            price: price,
            UserId: req.UserId
        });

        res.status(201).json({message: "Product created successfully"});

    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
}

export const updateProduct = async (req, res) => {

    try {

        const product = await Product.findOne({
            where: {uuid: req.params.id},
        });

        if(!product) return res.status(404).json({message: "Product not found"});

        const {name, price} = req.body;
        if(req.role === 'admin'){
            await Product.update({
                name: name,
                price: price
            },{
                where: {id: product.id}
            });
        }else{
            if(product.UserId !== req.UserId) return res.status(403).json({message: "Unauthorized"});
            await Product.update({
                name: name,
                price: price
            },{
                where: {
                    [Op.and]: [{id: product.id}, {UserId: req.UserId}],
                }
            });
           
        }

        res.status(200).json({message: "Product updated successfully"});
       
    } catch (error) {

        res.status(500).json({message: "Something went wrong"});
    }

}

export const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findOne({
            where: {uuid: req.params.id},
        });

        if(!product) return res.status(404).json({message: "Product not found"});

        if(req.role === 'admin'){
            await Product.destroy({
                where: {id: product.id}
            });
        }else{
            if(product.UserId !== req.UserId) return res.status(403).json({message: "Unauthorized"});
            await Product.destroy({
                where: {
                    [Op.and]: [{id: product.id}, {UserId: req.UserId}],
                }
            });
        }

        res.status(200).json({message: "Product deleted successfully"});
       
    } catch (error) {

        res.status(500).json({message: "Something went wrong"});
    }

}