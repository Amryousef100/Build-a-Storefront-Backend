"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const myProduct = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await myProduct.index();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await myProduct.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    // @ts-ignore
    const product = {
        productname: req.body.productname,
        price: req.body.price
    };
    try {
        const newProduct = await myProduct.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const product = await myProduct.delete(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const update = async (req, res) => {
    try {
        const product = await myProduct.show(req.params.id);
        const updatedProduct = await myProduct.update(product, req.body);
        res.json(updatedProduct);
    }
    catch (err) {
        res.json(err);
    }
};
const ProductsRoute = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', authentication_1.default, create);
    app.delete('/products/:id', authentication_1.default, destroy);
    app.patch('/products/:id', authentication_1.default, update);
};
exports.default = ProductsRoute;
