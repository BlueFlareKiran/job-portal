import jwt from 'jsonwebtoken'

const generateToken=(id)=>{
    const secret = process.env.JWT_SECRET || "default_secret";
    return jwt.sign({ id }, secret, { expiresIn: '30d' });
}

export default generateToken;