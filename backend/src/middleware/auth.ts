import { NextFunction, Request, Response } from "express-serve-static-core"
import jwt, { JwtPayload } from "jsonwebtoken"

declare global{
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken= (req: Request, res: Response, next: NextFunction)=>{
    const token= req.cookies["auth_token"];
    if(!token){
        return res.status(401).send({message: "No Token authorized"});
    }

    try{
        const decode= jwt.verify(token, process.env.JWT_SECRET_KEY as string)as JwtPayload;
        req.userId = (decode as JwtPayload).userId;
        next();
    } catch(error){
        return res.status(401).send({message: "Unauthorized"});
    }
}

export default verifyToken;