const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    try{
        const token = req.header("Authorization");

        if(!token){
            return res.status(401).json({
                message: "No token, Authorization denied",
            });
        }
        const actualToken = token.split(" ")[1];
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }catch (error) {
         return res.status(401).json({
            message: "Token is not valid!",
        });
    }
};

module.exports = protect;