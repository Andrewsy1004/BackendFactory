import categoryModel from '../models/category.js';


export const isCategoryExist = async (name) => {
    const exist = await categoryModel.findOne({ name });
    if (!exist)   throw new Error(`the category ${name} does not exist`);
    return exist;
}