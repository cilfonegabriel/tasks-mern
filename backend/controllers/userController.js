import User from "../models/User.js";
import generateId from "../helpers/generatId.js";

const register = async (req, res) => {
    //Avoid duplicate records
    const { email } = req.body
    const userExists = await User.findOne({ email });
    
    if(userExists) {
        const error = new Error("Already registered user");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        const userSave = await user.save();
        res.json(userSave);
    } catch (error) {
        console.error(error);
    }
}

const authenticate = async (req, res) => {

}

export {
    register,
    authenticate
};