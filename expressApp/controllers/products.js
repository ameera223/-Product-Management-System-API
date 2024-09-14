
const productRepository = require('../repositories/products');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');


//@desc Get all products
//@route Get/api/products
//@access Public
const getProducts = asyncHandler( async (req,res,next)=>{
    const products = await productRepository.getAllProducts();
    if(products){
        res.status(200).json({ success: true, data: products });
    }next()
});
        

//@desc  Get a particular product
//@route Get/api/products/:id
//@access Public
const getProduct =  asyncHandler( async (req,res,next)=>{
    const id = req.params.id;
    const product =  await productRepository.getProduct(id);
    if(product && product.length){
         return  res.status(200).json({
                success:true, 
                message: product })
        }
            next( new ErrorResponse(`Product does not exist with id ${id}`, 404))
        });


//@desc Create new products
//@route Post/api/products
//@access Public
const createProducts = asyncHandler( async (req,res,next)=>{
    const {title, image, price, offerprice} = req.body ;
    const newProduct = await productRepository.createProducts(title, image, price, offerprice);
    if(newProduct){
    res.status(201).json({ success: true, message: " Successfully added new product "})
    }
    next ()
});
    
//@desc  Update a particular product
//@route Put/api/products/:id
//@access Public
const updateProduct =asyncHandler( async (req,res,next)=>{
    const{title, image, price, offerprice}= req.body;
    const id = req.params.id;
    const updateProduct =  await productRepository.updateProduct(id,title, image, price, offerprice);
    if(updateProduct){
         return   res.status(200).json({success:true, 
                message:`Successfully updated product wih id ${req.params.id}`
        })}
            next( new ErrorResponse(`Product does not exist with id ${id}`, 404))
        });
        
//@desc  Delete a particular product
//@route Delete/api/products/:id
//@access Public
const deleteProduct =  asyncHandler(async (req,res,next)=>{
    const id = req.params.id;
    const deleteProduct =  await productRepository.deleteProduct(id);
    if (deleteProduct){
            res.status(200).json({success:true, 
                message:`Successfully deleted product wih id ${req.params.id}`  
        })}
        next( new ErrorResponse(`Product does not exist with id ${id}`, 404))
});

module.exports ={
    getProducts,
    getProduct,
    createProducts,
    updateProduct,
    deleteProduct
}; 