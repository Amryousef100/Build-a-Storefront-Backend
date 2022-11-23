// @ts-ignore
import express,{Request,Response} from "express";
import { Order,OrderStore } from "../models/order";
import jwt,{JwtPayload} from "jsonwebtoken";
import verifyAuthToken from "../middlewares/authentication";

const myOrder=new OrderStore();

const tokenSecret=process.env.TOKEN_SECRET as string;

const index=async(_req:Request,res:Response)=>{
    try{
        const orders=await myOrder.index();
        res.json(orders);
    }
    catch(err){
        res.status(400).json(err);
    }
}
const show =async (req:Request,res:Response)=>{
    try{
        /*const auth=req.headers.authorization as string;
        const token=auth.split(' ')[1]
        const decoded=jwt.verify(token,tokenSecret) as JwtPayload;
        const wantedOrder=await myOrder.show(req.params.id)
        if(decoded.addUser.id === wantedOrder.user_id){*/
            const order=await myOrder.show(req.params.id);
            res.json(order);
        //}
        /*else{
            res.json('Not Authorized to show the order with this ID !');
            return
        }*/
    }
    catch(err){
        res.status(401);
        res.json(`Unauthorized , Invalid token ${err}`);
    }
}
const create=async(req:Request,res:Response)=>{
    const order:Order={
        user_id:req.body.user_id,
        order_status :req.body.status
    }
    try{
        const newOrder=await myOrder.create(order);
        res.json(newOrder);
    }
    catch(err){
        res.status(400).json(err);
    }
}
const addProduct=async(req:Request,res:Response)=>{
    const orderId:string=req.params.id;
    const productId:string=req.body.product_id;
    const quantity:number=parseInt(req.body.quantity);
    try{
        /*const auth=req.headers.authorization as string;
        const token=auth.split(' ')[1]
        const decoded=jwt.verify(token,tokenSecret) as JwtPayload;
        const wantedOrder=await myOrder.show(req.params.id);
        if(decoded.addUser.id === wantedOrder.user_id){*/
            const addedProduct=await myOrder.addProduct(quantity,productId,orderId);
            res.json(addedProduct);
        //}
        /*else{
            res.json('Not Authorized to add products to the order with this ID !');
            return
        }*/
    }
    catch(err){
        res.status(401);
        res.json(`Unauthorized , Invalid token ${err}`);
    }
}
const destroy =async(req:Request,res:Response)=>{
    try{
        //const auth=req.headers.authorization as string;
        //const token=auth.split(' ')[1]
        //const decoded=jwt.verify(token,tokenSecret) as JwtPayload;
        //const wantedOrder=await myOrder.show(req.params.id)
        //if(decoded.addUser.id === wantedOrder.user_id){
            const order=await myOrder.delete(req.params.id);
            res.json(order);
        //}
        /*else{
            res.json('Not Authorized to delete the order with this ID !');
            return
        }*/
    }
    catch(err){
        res.status(401);
        res.json(`Unauthorized , Invalid token ${err}`);
    }
}
const OrdersRoute = (app:express.Application)=>{
    app.get('/orders',verifyAuthToken,index);
    app.get('/orders/:id',verifyAuthToken,show);
    app.post('/orders',verifyAuthToken,create);
    app.post('/orders/:id/products',verifyAuthToken,addProduct);
    app.delete('/orders/:id',verifyAuthToken,destroy)
}
export default OrdersRoute;