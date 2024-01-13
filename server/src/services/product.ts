import Product from "../models/Product";

export async function getProductFiltered(filter: any, sort?: any) {
    return Product.find(filter).limit(6).sort(sort);
}

export async function getProductById(productId: string) {
    return Product.findById(productId);
}

export async function searchProducts(search: string) {
    return Product.find({title: {$regex: search, $options:'i'}});
}

