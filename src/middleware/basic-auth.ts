import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

export function BasicAuth (req: Request, res: Response, next: NextFunction) {
    const dotEnvConfig = dotenv.config().parsed;
    if (!dotEnvConfig) {
        res.set('WWW-Authenticate', 'Basic realm="401"') // change this
        res.status(401).send('Authentication required.') // custom message
        return;
    }

    const auth = { username: dotEnvConfig.USER, password: dotEnvConfig.PASS };
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    
    // Verify login and password are set and correct
    if (login && password && login === auth.username && password === auth.password) {
        return next();
    }
    
    // Access denied
    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
}