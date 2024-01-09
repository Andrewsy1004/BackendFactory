import Jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

export const ValidarJwt = async(req, res, next) => {
    const token = req.header('jsonwebtoken');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'there is no token in the request'
        });
    }

    try {
         const {uid,rol} = Jwt.verify(token, process.env.SECRETORPRIVATEKEY);
         const usuario = await UserModel.findById(uid);
         
         if(!usuario || !usuario.estado ){
            return res.status(401).json({
                ok: false,
                msg: 'Something went wrong'
            });
         }
         

         console.log(rol);         
         if(rol !== 'ADMIN_ROLE'){
            return res.status(401).json({
                ok: false,
                msg: 'You dont have permission to do that'
            });
         }


         req.usuario = usuario;
         next();
    }catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        })
    }
}