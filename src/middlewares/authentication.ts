
import { Request,Response } from "express";
import jwt from "jsonwebtoken";
const verifyAuthToken = (req: Request, res: Response, next:Function) => {
    try{
        const auth=req.headers.authorization as string;
        const token=auth.split(' ')[1]
        jwt.verify(token,process.env.TOKEN_SECRET as string)
        next();
    }
    catch(err){
        res.status(401);
        res.json(`Invalid token ${err}`)
        return
    }
}
export default verifyAuthToken;