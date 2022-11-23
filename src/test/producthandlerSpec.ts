
import app from "../server";
import supertest from "supertest";
import {user,uesrStore} from "../models/user";
import jwt from "jsonwebtoken";

const myrequest=supertest(app);
const myUser=new uesrStore();
const tokenSecret=process.env.TOKEN_SECRET as string;
let token:string;

describe('Product handler test',()=>{
    beforeAll(async()=>{// @ts-ignore
        const user:user={firstname:"tamer",lastname:"ali",password:"432"};
        const addeduser=await myUser.create(user);
        token= jwt.sign({user:addeduser},tokenSecret) 
    })

    it('create method should return status code of 200',async()=>{
        const myresponse=await myrequest.post('/products')
        .set({'Authorization':'Bearer '+token, 'Content-Type': 'application/json'})
        .send({productname:"cap",price:8});
        expect(myresponse.status).toEqual(200);
    })

    it('index method should return status code of 200',async()=>{
        const myresponse=await myrequest.get('/products');
        expect(myresponse.status).toEqual(200);
    })

    it('show method should return status code of 200',async()=>{
        const myresponse=await myrequest.get('/products/3');
        expect(myresponse.status).toEqual(200);
    })

})