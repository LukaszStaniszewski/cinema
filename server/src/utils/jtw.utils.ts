import jwt from "jsonwebtoken";

export const signJwt = (payload: Record<string, unknown>, privateKey: string, options: string) => {
  return jwt.sign(payload, privateKey, { expiresIn: options, algorithm: "RS256" });
};
interface IVerifyToken {
  id: string;
  [key: string]: any;
}

export const verifyToken = (token: string, publicKey: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      isValid: true,
      expired: false,
      decoded: decoded as IVerifyToken,
    };
  } catch (error) {
    return {
      isValid: false,
      expired: true,
      decoded: null,
    };
  }
};
