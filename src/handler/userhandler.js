"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication_1 = __importDefault(require("../middlewares/authentication"));
const myUser = new user_1.uesrStore();
const tokenSecret = process.env.TOKEN_SECRET;
const index = async (_req, res) => {
    try {
        const users = await myUser.index();
        res.json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        if (decoded.addUser.id === parseInt(req.params.id)) {
            const user = await myUser.show(req.params.id);
            res.json(user);
        }
        else {
            res.json('Not Authorized to get info with this ID !');
            return;
        }
    }
    catch (err) {
        res.status(401);
        res.json(`Unauthorized , Invalid token ${err}`);
    }
};
const create = async (req, res) => {
    // @ts-ignore
    const adduser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try {
        const newUser = await myUser.create(adduser);
        var token = jsonwebtoken_1.default.sign({ addUser: newUser }, tokenSecret);
        res.json(token);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        if (decoded.addUser.id === parseInt(req.params.id)) {
            const user = await myUser.delete(req.params.id);
            res.json(user);
        }
        else {
            res.json('Not Authorized to delete this user with this ID !');
            return;
        }
    }
    catch (err) {
        res.status(401);
        res.json(`Unauthorized , Invalid token ${err}`);
    }
};
const update = async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, tokenSecret);
        if (decoded.addUser.id === parseInt(req.params.id)) {
            const user = await myUser.show(req.params.id);
            const updatedUSer = await myUser.update(user, req.body);
            res.json(updatedUSer);
        }
        else {
            res.json('Not Authorized to update user with this ID !');
            return;
        }
    }
    catch (err) {
        res.status(401);
        res.json(`Unauthorized , Invalid token ${err}`);
    }
};
const UsersRoute = (app) => {
    app.get('/users', authentication_1.default, index);
    app.get('/users/:id', authentication_1.default, show);
    app.post('/users', create);
    app.delete('/users/:id', authentication_1.default, destroy);
    app.patch('/users/:id', authentication_1.default, update);
};
exports.default = UsersRoute;
