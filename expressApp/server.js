const dotenv = require('dotenv');
const express = require('express');

dotenv.config({path : './config/config.env'});

const app = express();
const PORT = process.env.PORT||9000;

const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({success:true, message:"Welcome to Products"})
});

const products = require('./routes/products');
app.use('/api/products',products);

const users = require('./routes/users');
app.use('/api/users',users);


app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Running on  ${process.env.NODE_ENV} on ${PORT}`);
})