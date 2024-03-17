import { User } from "../Models/User.js";

export const newUser = async (req, res, next) => {
  try {
    const { email, _id, name, photo } = req.body;
    let user = await User.findById(_id);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exists with this email",
      });
    }
    user = await User.create({
      _id,
      email,
      photo,
      name,
    });
    return res.status(200).json({
      success: true,
      message: `welcome ${user.name}`,
    });
  } catch (error) {
    console.log(error),
      res.status(400).json({
        success: false,
        message: error,
      });
  }
};


export const getAllUsers=async(req,res)=>{
    try {
        const users = await User.find({});
        return res.status(201).json({
            success:true,
            users
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error
          });
    }
}

export const getUser=async(req,res)=>{
    try {
        const id =req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                success:false,
                message:"invalid id"
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error
        })
    }
}


export const deleteUser=async(req,res)=>{
    try {
        const id =req.params.id;
        const user = await User.findById(id);
        await user.deleteOne();
        if (!user) {
            return res.status(400).json({
                success:false,
                message:"invalid id"
            })
        }
        return res.status(200).json({
            success:true,
            message:"deleted"
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:error
        })
    }
}
