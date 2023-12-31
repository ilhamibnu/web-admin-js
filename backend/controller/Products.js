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
    
        
}

export const updateProduct = async (req, res) => {
            
}

export const deleteProduct = async (req, res) => {
                
}