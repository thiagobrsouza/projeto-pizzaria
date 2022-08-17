import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
     const authToken = req.headers.authorization;
     
     // validate if token exists
     if (!authToken) {
        throw res.status(401).end();
     }
     
     // destructuring bearer token and get just jwt token
     const [, token] = authToken.split(" ");
     
     // validate if token is valid and return user id
     try {
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
        return next();
     } catch (error) {
        return res.status(401).end();
     }
}