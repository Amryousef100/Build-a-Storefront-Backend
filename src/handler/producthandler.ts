import express,{Request,Response} from "express";
import {Product,ProductStore} from "../models/product";
import verifyAuthToken from "../middlewares/authentication";

const myProduct=new ProductStore();

const index = async (_req:Request,res:Response)=>{
    try{
        const products= await myProduct.index();
        res.json(products);
    }
    catch(err){
        res.status(400).json(err);
    }
}
const show =async (req:Request,res:Response)=>{
    try{
        const product= await myProduct.show(req.params.id);
        res.json(product);
    }
    catch(err){
        res.status(400).json(err);
    }
}
const create =async (req:Request,res:Response)=>{
    // @ts-ignore
    const product:Product={
       
        productname:req.body.productname,
        price:req.body.price
    }
    try{
        const newProduct=await myProduct.create(product);
        res.json(newProduct);
    }
    catch(err){
        res.status(400).json(err);
    }
}
const destroy=async(req:Request,res:Response)=>{
    try{
        const product=await myProduct.delete(req.params.id);
        res.json(product);
    }
    catch(err){
        res.status(400).json(err);
    }
}
const update=async (req:Request,res:Response)=>{
    try{
        const product=await myProduct.show(req.params.id);
        const updatedProduct=await myProduct.update(product,req.body);
        res.json(updatedProduct);
    }
    catch(err){
        res.json(err)
    }
}
const ProductsRoute =(app:express.Application)=>{
    app.get('/products',index);
    app.get('/products/:id',show);
    app.post('/products',verifyAuthToken,create);
    app.delete('/products/:id',verifyAuthToken,destroy);
    app.patch('/products/:id',verifyAuthToken,update);
}
export default ProductsRoute;