import { Response, Request } from "express";

export function logger (req: Request, _res: Response, next: Function) {
    console.info(`${Date()} ${req.ip} ${req.url}`);
    next();
}