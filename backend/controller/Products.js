import Product from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message || "Something went wrong"});
    }

}

export const getProductById = async (req, res) => {
        
        try{
            try {
                const response = await Product.findOne({
                    where: {
                        uuid: req.params.id
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

export const createProduct = async (req, res) => {

        const { name, price, userId } = req.body;
        try {
            const response = await Product.create({
                name,
                price,
                userId
            });
            res.status(200).json({message: "Product created successfully"});
        } catch (error) {
            res.status(500).json({message: error.message || "Something went wrong"});
        }
}

export const updateProduct = async (req, res) => {
        
        const { id } = req.params;
        const { name,  } = req.body;
        try {
            const response = await Product.update({
                name,
                price,
                userId
            },{
                where: {
                    id: id
                }
            });
            res.status(200).json({message: "Product updated successfully"});
        } catch (error) {
            res.status(500).json({message: error.message || "Something went wrong"});
        }
            
}

export const deleteProduct = async (req, res) => {

    const { id } = req.params;
    try {
        const response = await Product.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message || "Something went wrong"});
    }
                
}