const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')


const test = (req, res) => {
    res.json('test is working')
}


//Register endpoint
const registerUser = async(req, res) => {
 try {
    const {name, email, password} = req.body
    //check if name was entered 
    if(!name){
        return res.json({
            error:'name is required'
        })
    };
    //check password 
    if(!password || password.length < 6) {
        return res.json({
            error: 'password is required, should be 6 carachters long'
        })
    };
    //check email 
    const exist = await User.findOne({email})
    if(exist){
        return res.json({
            error: 'email is taken'
        })
    }


    const hashedPassword = await hashPassword(password)
    //create user 
    const user = await User.create({
        name,
         email,
         password: hashedPassword
    })

    return res.json(user)

 } catch (error) {
    console.log(error)
 }
}


const loginUser = async (req, res) => {
try {
    const {email, password} = req.body;

  
    const user = await User.findOne({email});
    if(!user){
        return res.json({
            error: ' no user found'
        })
    }


    const match = await comparePassword(password, user.password)
   
    if(match) {
        jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err)throw err;
            res.cookie('token', token).json(user)
        } )
    }
    if(!match) {
        res.json({
            error: "Password do not match"
        })
    }
} catch (error) {
    console.log(error)
}
}



const getProfile = (req, res) => {
    const { token } = req.cookies || {}; 
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }


        const userId = decoded.id; 
        User.findById(userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                res.json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Server error' });
            });
    });
};

const logoutUser = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ message: 'Logged out successfully' });
};



module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}