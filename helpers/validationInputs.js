import UserModel from '../models/user.js';

export const isEmailExist = async (email = "") => {
    const exist = await UserModel.findOne({email});
    if(exist) throw new Error(`The email ${email} already was registered`);
}
