import mongoose from "mongoose";

const ProuctSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        trim: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'The category is required']
    },
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    available: {
        type: Boolean,
        default: true
    }
})

ProuctSchema.methods.toJSON = function (){
    const { __v,estado, ...data } = this.toObject();
    return data;
}

const ProductModel = mongoose.model('Product', ProuctSchema);
export default ProductModel;

