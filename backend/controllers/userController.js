import User from "../models/User.js";

const register = async (req, res) => {
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