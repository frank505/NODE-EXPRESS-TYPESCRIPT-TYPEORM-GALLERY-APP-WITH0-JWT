import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import CustomResponseHelper from "../../helpers/CustomResponseHelper";

const customResponse = new CustomResponseHelper();

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const tokenWithBearer:string|undefined|null = req.headers["authorization"];
  if(tokenWithBearer == '' || tokenWithBearer == undefined || tokenWithBearer == null)
  {
    return customResponse.setHttpResponse(401,res,false,'unathorized');
  }

  const splitTokenWithBearer =   tokenWithBearer.split(' ');
  const token = splitTokenWithBearer[1];
  
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    res.locals.jwtPayload = jwtPayload;
    // console.log(jwtPayload);
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    return customResponse.setHttpResponse(401,res,false,'unathorized');
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const {type, id, email } = jwtPayload;
  const newToken = jwt.sign({ type, id, email }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: "24h"
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};