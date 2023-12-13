import jwt from "jsonwebtoken";

const generateJWT = () => {
    return jwt.sign({ name:'Gabriel' }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
};

export default generateJWT;