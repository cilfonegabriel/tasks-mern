
const register = (req, res) => {
    console.log(req.body);
    res.json({msg: "Creatin an user"})
}

export {
    register
};