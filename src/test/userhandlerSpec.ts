import app from "../server";
import supertest from "supertest";
import {user,uesrStore} from "../models/user";

const myrequest=supertest(app);
const myUser=new uesrStore();
const tokenSecret=process.env.TOKEN_SECRET as string;
let token:string;
const user:user={id:1,firstname:"amr",lastname:"youssef",password:"123"};

describe('User handler test',()=>{

    it('create method should return status code of 200',async()=>{
        const myresponse=await myrequest.post('/users')
        .send(user);
        token=myresponse.body;
        expect(myresponse.status).toEqual(200);
    })

    it('index method should return status code of 200',async()=>{
        const myresponse=await myrequest.get('/users')
        .set({'Authorization':'Bearer '+token, 'Content-Type': 'application/json'});
        expect(myresponse.status).toEqual(200);
    })

    it('show method should return status code of 200',async()=>{
        const myresponse=await myrequest.get('/users/9')
        .set({'Authorization':'Bearer '+token, 'Content-Type': 'application/json'});
        expect(myresponse.status).toEqual(200);
    })

})