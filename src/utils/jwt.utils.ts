import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";
import { PrimitiveUser, SecurePrimitiveUser } from "../interfaces/user";

export class JWTService {
  static generateToken(user: PrimitiveUser) {
    const { password, ...payload } = user;
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return token;
  }

  static verifyToken(token: string): SecurePrimitiveUser | null {
    try{
      const payload = jwt.verify(token, JWT_SECRET) as SecurePrimitiveUser;
      return payload
    }catch(err){
      return null
    }
  }
  
}
