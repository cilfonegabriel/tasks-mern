import User from "../models/User.js";

const register = async (req, res) => {
    //Avoid duplicate records
    const { email } = req.body
    const userExists = await User.findOne({ email });
    
    if(userExists) {
        const error = new Error("Already registered user");
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body)
        const userSave = await user.save()
        res.json(userSave)
    } catch (error) {
        console.error(error);
    }
}

export {
    register
};