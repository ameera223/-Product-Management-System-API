const getAllProducts = 
    "SELECT id, title, image, price, offerprice FROM products";

const getProductById = 
    "SELECT id, title, image, price, offerprice FROM products WHERE id = $1";

const addProducts =
    "INSERT INTO products (title, image, price, offerprice) VALUES ($1,$2,$3,$4)";

const updateProduct = "UPDATE products set title=$1, image=$2, price=$3, offerprice=$4 WHERE id =$5";

const removeProduct = "DELETE FROM products WHERE id =$1";

    module.exports = {
        getAllProducts,
        getProductById,
        addProducts,
        updateProduct,
        removeProduct
    }