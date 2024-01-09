import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    email : {
        type: String,
        required: [true, 'The email is required'],
        unique: true,
    },
    password : {
        type: String,
        required: [true, 'The password is required'],
        unique: true,
    },
    rol : {
        type: String,
        required: [true, 'The rol is required'],
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    estado : {
        type: Boolean,
        default: true,
    }
})

UserSchema.methods.toJSON = function (){
    const { __v,password, _id , ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}


const UserModel = mongoose.model('User', UserSchema);
export default UserModel;