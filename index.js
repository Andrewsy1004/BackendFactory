import Express from 'express';
import cors from 'cors';
import {dbConnection} from './database/config.js';
import userRoute from './router/userRouter.js';
import categoryRouter from './router/categoryRouter.js';
import productRouter from './router/productRouter.js';
import 'dotenv/config';


const app = Express();
const PORT = process.env.PORT || 3000;

dbConnection();

app.use(Express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use(cors());
app.use(Express.json());

app.use('/api/auth', userRoute);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});