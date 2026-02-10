import jwt, { type SignOptions } from "jsonwebtoken";

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
}

export function generateToken(payload: JWTPayload): string {
  const options: SignOptions = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, process.env.JWT_SECRET as string, options);
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
}
