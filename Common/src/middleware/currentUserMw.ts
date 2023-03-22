import { Request, Response , NextFunction} from "express";
import jsonwebtoken from 'jsonwebtoken'

interface UserPayload{
    id: string,
    email: string
    verified: boolean
}

declare global{
    namespace Express{
        interface Request{
            currentUser?:UserPayload;
        }
    }
}

export const currentUserMiddleware = async (req: Request,res: Response, next: NextFunction) => {
    if (!req.session?.jwt) return next();
    try {
        const payload = (jsonwebtoken.verify(req.session.jwt,process.env.JWT_KEY!)) as UserPayload;
        req.currentUser = payload;
    } catch (error) {
    }
    next();
}