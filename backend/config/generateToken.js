import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return token
}