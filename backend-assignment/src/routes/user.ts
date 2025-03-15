import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { auth } from '../middleware/auth';
import { IAuthRequest, AuthRequestHandler } from '../interfaces';

const router = Router();

// Helper function to create JWT token
const createToken = (userId: string): string => {
    return jwt.sign(
        { _id: userId },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: Number(process.env.JWT_EXPIRES_IN) || 604800 } // 7 days in seconds
    );
};

// User Registration
const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({ error: 'Email already exists' });
            return;
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();
        const token = createToken(user._id.toString());
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
};

// User Login
const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(401).json({ error: 'Invalid login credentials' });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid login credentials' });
            return;
        }

        const token = createToken(user._id.toString());
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'Error logging in' });
    }
};

// Get user profile
const getProfile: AuthRequestHandler = async (req, res) => {
    try {
        if (!req.user?._id) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
};

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', auth, getProfile);

export default router; 