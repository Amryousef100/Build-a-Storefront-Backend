import {user,uesrStore} from "../models/user";
import bcrypt from "bcrypt";

const user=new uesrStore();

const usertest:user={id:5,firstname:'amr',lastname:'ans',password:'987'}

describe ("User Model Test",()=>{
    it('should have an index method',()=>{
        expect(user.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user.create).toBeDefined();
    });
    it('should have an update method', () => {
        expect(user.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(user.delete).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await user.create(usertest);
        expect(result).toEqual({
            id:5,
            firstname:'amr',
            lastname:'ans',
            password:result.password
        });
    });
    it('index method should return an array of users',async()=>{
        const result=await user.index();
        expect(result).not.toEqual([]);
    });
      
    it('show method should return the correct user', async () => {
        const result = await user.show("5");
        expect(result).toEqual({
            id:5,
            firstname:'amr',
            lastname:'ans',
          password:result.password
        });
    });
    
})
