import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';

/**
 * Validate request body against a Zod schema.
 */
export const validateRequestBody = (schema: ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync(req.body);
    next();
  };
};
