import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {

    if(!req.session.UserId){
        return res.status(401).json({message: "Unauthorized"});
    }

    const user = await User.findOne(
        {
            attributes : ['uuid', 'name', 'email', 'role'],
            where: {uuid: req.session.UserId}
        }
    );

    if(!user) return res.status(400).json({message: "User not found"});
    req.UserId = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async (req, res, next) => {
    const user = await User.findOne(
        {
            attributes : ['uuid', 'name', 'email', 'role'],
            where: {uuid: req.session.UserId}
        }
    );

    if(!user) return res.status(400).json({message: "User not found"});
    if(user.role !== 'admin') return res.status(403).json({message: "Unauthorized"});
    next();
}