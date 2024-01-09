import ProductModel from '../models/product.js';
import categoryModel from '../models/category.js';

export const createProduct = async (req, res) => {
  try {
    
    const { name, description, category, price, ...body } = req.body;

    const newProduct = await ProductModel.findOne({ name });

    if(!!newProduct) return res.status(400).json({msg: 'Product already exists'});
    
    
    const productoDb = await categoryModel.findOne({ name: category });
    
    const data = {
      name: name,
      user: req.usuario._id,
      price: price,
      category: productoDb._id,
      description: description,
   };
    
    const product = new ProductModel(data);
    await product.save();

    res.json(product);
     
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
};

export const getAllTheProducts = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };

  try {
      const [total, productos] = await Promise.all([
        ProductModel.countDocuments(query),
        ProductModel.find(query)
              .populate({
                path: 'user',
                select : '_id name email'
              })
              .populate({
                path: 'category',
                select : '_id name'
              })
              .skip(Number(desde))
              .limit(Number(limite))
      ]);

      res.json({
          total,
          productos 
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Something went wrong' });
      Producto   }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id)
      .populate({
        path: 'category',
        select : '_id name'
      })
      .populate({
        path: 'user',
        select : '_id name email'
      })
     
    res.json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
}

export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDelete = await ProductModel.findByIdAndUpdate(id, { state: false }, { new: true });
    res.json(productDelete);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
}


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {name,description} = req.body;
    
    const product = await ProductModel.findByIdAndUpdate(id, { name, description }, { new: true });
    res.json(product);
    
  }catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Something went wrong', error });
  }
   

}