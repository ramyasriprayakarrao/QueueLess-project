const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
        expiresIn: '30d',
    });
};

const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Successfully authenticates any input for local testing
        return res.status(200).json({
            _id: '123456',
            email: email,
            role: role || 'student',
            token: generateToken('123456')
        });
    } catch (error) {
        return res.status(500).json({ message: error.message || 'Server error' });
    }
};

module.exports = { loginUser };