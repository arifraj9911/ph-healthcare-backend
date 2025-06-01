import { NextFunction, Request, Response } from "express";
import status from "http-status";

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "API Not Found!",
    error:{
      path:req.originalUrl,
      message:"You are hit on incorrect api path!"
    }
  });
}

export default notFoundRoute