import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Se hizo una peticion ${req.method} a la ruta ${req.path}`);
  next();
}
