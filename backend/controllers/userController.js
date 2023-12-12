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
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email})
    if(!user) {
        const error = new Error("Username does not exist");
        return res.status(404).json({ msg: error.message });
    }

    // Check if the user is confirmed
    if(!user.confirmed) {
        const error = new Error("Your account has not been confirmed");
        return res.status(403).json({ msg: error.message });
    }
    console.log(user)

    // Check your password

}

export {
    register,
    authenticate
};