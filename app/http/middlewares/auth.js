import jwt from 'jsonwebtoken'
const auth = async (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({ message: "token is not define" });
    }
    const token = authHeader.split(" ")[1]
    try {
        const { id, role } = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = {
            id,
            role
        }
        console.log("user",user)
        req.user = user

        next()

    }
    catch (err) {
        return res.status(400).json({ message: "unAuthorized" })
    }

}

export default auth;