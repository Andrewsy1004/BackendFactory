import CategorySchema from '../models/category.js'

export const createCategory = async(req, res) => {
    try {
        const name = req.body.name.toUpperCase();
        const existingCategoria = await CategorySchema.findOne({ name });
    
        if (existingCategoria) {
            return res.status(400).json({
                msg: `The category ${existingCategoria.name} already was registered`
            });
        }
        
        const data = {
            name,
            user: req.usuario 
        };
    
        const categoriaDB = new CategorySchema(data);
        await categoriaDB.save();
    
        res.json({
            msg: 'The category was created successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong' });
    }    
}

export const getAllCategory = async(req, res) => {
    const { limite = 5, offset = 0 } = req.query;
    const query = { state: true };

    try {
        const [total, categorias] = await Promise.all([
            CategorySchema.countDocuments(query),
            CategorySchema.find(query)
                .populate({
                    path: 'user',
                    select: '_id name email' 
                })
                .skip(Number(offset))
                .limit(Number(limite))
        ]);
        
        res.json({
            total,
            categorias 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
    
}


export const getCategoryById = async(req, res) => {
    const { id } = req.params;
    try {
        const categoria = await CategorySchema.findById(id)
            .populate({
                path: 'user',
                select: '_id name email'
            });
        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}


export const deleteCategoryById = async(req, res) => {
    const { id } = req.params;
    try {
        const categoria = await CategorySchema.findByIdAndUpdate(id, { state: false }, { new: true });
        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}


export const updateCategoryById = async(req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const categoria = await CategorySchema.findByIdAndUpdate(id, { name }, { new: true });
        res.json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}