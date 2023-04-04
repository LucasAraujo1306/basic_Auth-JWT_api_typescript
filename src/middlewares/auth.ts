import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import { User } from '../models/User';

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let success = false;
        //fazer verificação de auth

        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ');
            if (authType === 'Bearer') {
                try {
                    JWT.verify(
                        token,
                        process.env.JWT_SECRET as string
                    );
                    success = true;
                } catch (error) {

                }
            }
        }

        if (success) {
            next();
        } else {
            res.status(403).json({ error: 'Unauthorized' });
        }
    }
}
