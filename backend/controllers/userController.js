import User from "../models/User.js";
import generateId from "../helpers/generatId.js";
import generateJWT from "../helpers/generateJWT.js";

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
        await user.save();
        res.json({msg: 'Successfully created user, confirm your account from email'});
    } catch (error) {
        console.error(error);
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;
    // Check if the user exists
    const user = await User.findOne({ email });
    if(!user) {
        const error = new Error("Username does not exist");
        return res.status(404).json({ msg: error.message });
    }

    // Check if the user is confirmed
    if(!user.confirm) {
        const error = new Error("Your account has not been confirmed");
        return res.status(403).json({ msg: error.message });
    }

    // Check your password
    if(await user.checkPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id),
        });
    } else {
        const error = new Error("Password is incorrect");
        return res.status(403).json({ msg: error.message });
    }
}

const confirm = async (req, res) => {
    const{ token } = req.params
    const confirmUser = await User.findOne({ token });
    if(!confirmUser) {
        const error = new Error("Invalid Token");
        return res.status(403).json({ msg: error.message });
    }

    try {
        confirmUser.confirm = true;
        confirmUser.token = "";
        await confirmUser.save();
        res.json({ msg: "Successfully Confirmed User"});   
    } catch (error) {
        console.log(error);
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        const error = new Error("Username does not exist");
        return res.status(404).json({ msg: error.message });
    }

    try {
        user.token = generateId()
        await user.save();
        res.json({ msg: "We have sent an email with instructions" });
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

const checkToken = async (req, res) => {
    const { token } = req.params;
    const validToken = await User.findOne({ token });

    if(validToken) {
        res.json({ msg: "The token is valid and user exist"});
    } else {
        const error = new Error("Invalid token");
        return res.status(404).json({ msg: error.message });
    }
 }

 const newPassword = async (req, res) => {
    const { token } = req.params;
    const  { password } = req.body;

    const user = await User.findOne({ token });

    if(user) {
        user.password = password;
        user.token = "";
        try {
            await user.save();
            res.json({ msg: "Password successfully modified"});
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error("Invalid token");
        return res.status(404).json({ msg: error.message });
    }
 }

 const profile = async (req, res) => {
    const { user } = req

    res.json(user)
 }

export {
    register,
    authenticate,
    confirm,
    forgotPassword,
    checkToken,
    newPassword,
    profile
};