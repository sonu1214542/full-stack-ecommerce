import { User } from "../Models/User.js";

export const isAdmin=async(req,res,next)=>{
    try {
        const {id}=req.query;
        if (!id) {
            return res.status(400).json({
                success:false,
                message:"pls login"
            })
        }

        const user =await User.findById(id);

        if (!user) {
            return res.status(400).json({
                success:false,
                message:"invalid user id"
            })
        }
        if (user.role!=="admin") {
            return res.status(400).json({
                success:false,
                message:"only admin!"
            })
        }
        if (user.role=="admin") {
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error
        })
    }
}