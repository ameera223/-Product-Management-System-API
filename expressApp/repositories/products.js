const pool =require('../config/db');
const productQueries = require('../queries/products');

const getAllProducts = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query(productQueries.getAllProducts,(error,results)=>{
            if (error) {
                console.error('Error fetching products:', error);
                reject(error);
            }else{
            resolve(results.rows);
            console.log(results.rows);
            }
            })
    })  
};
        
const getProduct = (id)=>{ return new Promise((resolve,reject)=>{
    pool.query(productQueries.getProductById,[id],(error,results)=>{
        if (error) {
            console.error('Error fetching products:', error);
            reject(error);
        }else{
            resolve(results.rows);
            console.log(results.rows);
        }
    })
})};

//@desc to check whether the product exist
const checkProductExistsById = (id)=>{ 
    return new Promise((resolve,reject)=>{
    pool.query(productQueries.getProductById,[id],(error,results)=>{
        if (error) {
            console.error('Error fetching products:', error);
            reject(false);
        }else{
            resolve(results.rows.length>0);
            console.log(results.rows);
        }
    })
})};


const createProducts = (title, image, price, offerprice)=>{
    return new Promise((resolve,reject)=>{
    pool.query(productQueries.addProducts,[title, image, price, offerprice],
    (error,results)=>
        {
            if(error){
                console.error( error);
                reject(error);
            }else{
            resolve(true);
            console.log(results.rows);
            }
        })
        }  )
};

const updateProduct = (id,title, image, price, offerprice)=>{
    return new Promise((resolve,reject)=>{
    pool.query(productQueries.updateProduct,
        [title, image, price, offerprice,id],(error,results)=>{
    if (error) {
        reject(error)
        console.error('Error updating product:', error);
    }else{
    resolve(results.rows)
}})})};

const deleteProduct = (id)=>{
        return new Promise((resolve,reject)=>{
        pool.query(productQueries.removeProduct,[id],(error,results)=>{
        if (error) {
            console.error(error);
            reject(error);
        }else{
            resolve(results.rows)}
        })})};



module.exports ={
    getAllProducts,
    getProduct,
    createProducts,
    updateProduct,
    deleteProduct,
    checkProductExistsById
}; 