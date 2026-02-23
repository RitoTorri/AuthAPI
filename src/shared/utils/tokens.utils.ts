import * as jwt from 'jsonwebtoken';  // ← Alternativa

export const generateToken = (payload: object, jwtSecret : string, expiresIn): string => {
    try {
        console.log("Generando token");
        console.log(payload);
        console.log(jwtSecret);
        console.log(expiresIn);
        return jwt.sign(payload, jwtSecret, { expiresIn: expiresIn });
    } catch (error) { throw error; }
}