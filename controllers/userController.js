import { GenerateToken } from '../helpers/generateToken.js';
import UserModel from '../models/user.js';
import bcrypt from 'bcryptjs';


export const createUser = async(req, res) => {
    const {name, email, password, rol}  = req.body;
    const newUser = new UserModel({name, email, password, rol}); 

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();
    
    const token = await GenerateToken( newUser.id, newUser.rol ); 

    res.status(200).json({
        ok: true,
        uid: newUser.id,
        name: newUser.name,
        token       
    })
}

export const getAllTheUsers = async(req, res) => {
    const {limit=3 , offset=0} = req.query; 

    const [total, users] = await Promise.all([
        UserModel.countDocuments({estado: true}),
        UserModel.find({estado: true})
          .skip(Number(offset))
          .limit(Number(limit)),
    ])

   res.status(200).json({
       total,
       users 
   });
};

export const login = async(req, res) => {
    const {email, password} = req.body

    try{

        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({
                ok: false,
                message: 'User not found'
            })
        }
        
        if(user.estado === false){
            return res.status(400).json({
                ok: false,
                message: 'User not active'
            })
        }

        const Vpassword = bcrypt.compareSync(password, user.password);
        if(!Vpassword){
            return res.status(400).json({
                ok: false,
                message: 'Password incorrect'
            })
        }
        
        const token = await GenerateToken( user._id, user.rol );

        res.status(200).json({
            user,
            token
        })
    }catch (error) {
       console.log(error)
       return res.status(500).json({
           ok: false,
           message: 'Error'
       })
    }
}