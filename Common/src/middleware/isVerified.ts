import { Request, Response, NextFunction } from "express"
import { EmailVerificationError } from "../errors/EmailVerificationError";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";

export const isVerified = (req:Request,res: Response,next: NextFunction) => {
    if (!req.currentUser?.verified) throw new EmailVerificationError();
    next()
}