"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const myOrder = new order_1.OrderStore();
const tokenSecret = process.env.TOKEN_SECRET;
const index = async (_req, res) => {
    try {
        const orders = await myOrder.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        /*const auth=req.headers.authorization as string;
        const token=auth.split(' ')[1]
        const decoded=jwt.verify(token,tokenSecret) as JwtPayload;
        const wantedOrder=await myOrder.show(req.params.id)
        if(decoded.addUser.id === wantedOrder.user_id){*/
        const order = await myOrder.show(req.params.id);
        res.json(order);
        //}
        /*else{
            res.json('Not Authorized to show the order with this ID !');
            return
        }*/
    }
    catch (err) {
        res.status(401);
        res.json(`Unauthorized , Invalid token ${err}`);
    }
};
const create = async (req, res) => {
    const order = {
        user_id: req.body.user_id,
        status: req.body.status
    };
    try {
        const newOrder = await myOrder.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const addProduct = async (req, res) => {
    const orderId = req.params.id;
    const productId = req.body.product_id;
    const quantity = parseInt(req.body.quantity);
    try {
        /*const auth=req.headers.authorization as string;
        const token=auth.split(' ')[1]
        const decoded=jwt.verify(token,tokenSecret) as JwtPayload;
        const wantedOrder=await myOrder.show(req.params.id);
        if(decoded.addUser.id === wantedOrder.user_id){*/
        const addedProduct = await myOrder.addProduct(quantity, productId, orderId);
        res.json(addedProduct);
        //}
        /*else{
            res.json('Not Authorized to add products to the order with this ID !');
            return
        }*/
    }
    catch (err) {
        res.status(401);
        res.json(`Unauthorized , Invalid token ${err}`);
    }
};
const destroy = async (req, res) => {
    try {
        //const auth=req.headers.authorization as string;
        //const token=auth.split(' ')[1]
        //const decoded=jwt.verify(token,tokenSecret) as JwtPayload;
        //const wantedOrder=await myOrder.show(req.params.id)
        //if(decoded.addUser.id === wantedOrder.user_id){
        const order = await myOrder.delete(req.params.id);
        res.json(order);
        //}
        /*else{
            res.json('Not Authorized to delete the order with this ID !');
            return
        }*/
    }
    catch (err) {
        res.status(401);
        res.json(`Unauthorized , Invalid token ${err}`);
    }
};
const OrdersRoute = (app) => {
    app.get('/orders', authentication_1.default, index);
    app.get('/orders/:id', authentication_1.default, show);
    app.post('/orders', authentication_1.default, create);
    app.post('/orders/:id/products', authentication_1.default, addProduct);
    app.delete('/orders/:id', authentication_1.default, destroy);
};
exports.default = OrdersRoute;
