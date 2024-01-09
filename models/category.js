import moongoose from 'mongoose';

const CategorySchema = new moongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


CategorySchema.methods.toJSON = function (){
    const { __v,estado, ...data } = this.toObject();
    return data;
}

const categoryModel = moongoose.model('Category', CategorySchema);
export default categoryModel;