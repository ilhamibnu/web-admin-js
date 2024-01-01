import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";

export const getProducts = async (req, res) => {

    try {
        let response;
        if(req.role === 'admin'){
            response = await Product.findAll({
                include: [{
                    model: User,
                }]
            });

        }else{
            response = await Product.findAll({
                where: {UserId: req.UserId},
                include: [{
                    model: User,
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
        const response = await Product.findOne({
            where: {id: req.params.id}
        });

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

    const {name, price} = req.body;
    const {id} = req.params;

    try {
        await Product.update({
            name: name,
            price: price,
        },
        {
            where: {id: id}
        });

        res.status(200).json({message: "Product updated successfully"});

    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }

}

export const deleteProduct = async (req, res) => {

    const {id} = req.params;

    try {
        await Product.destroy({
            where: {id: id}
        });

        res.status(200).json({message: "Product deleted successfully"});

    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }

}