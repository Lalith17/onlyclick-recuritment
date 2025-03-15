import { Router } from 'express';
import { Task } from '../models/Task';
import { auth } from '../middleware/auth';
import { IAuthRequest, AuthRequestHandler } from '../interfaces';

const router = Router();

// Create a new task
const createTask: AuthRequestHandler = async (req, res) => {
    try {
        if (!req.user?._id) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const task = new Task({
            ...req.body,
            userId: req.user._id
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: 'Error creating task' });
    }
};

// Get all tasks for a user
const getAllTasks: AuthRequestHandler = async (req, res) => {
    try {
        if (!req.user?._id) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

// Get a specific task
const getTask: AuthRequestHandler = async (req, res) => {
    try {
        if (!req.user?._id) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' });
    }
};

// Update a task
const updateTask: AuthRequestHandler = async (req, res) => {
    try {
        if (!req.user?._id) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const updates = Object.keys(req.body);
        const allowedUpdates = ['title', 'description', 'completed'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            res.status(400).json({ error: 'Invalid updates' });
            return;
        }

        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }

        updates.forEach(update => {
            if (req.body[update] !== undefined) {
                (task as any)[update] = req.body[update];
            }
        });

        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: 'Error updating task' });
    }
};

// Delete a task
const deleteTask: AuthRequestHandler = async (req, res) => {
    try {
        if (!req.user?._id) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};

router.post('/', auth, createTask);
router.get('/', auth, getAllTasks);
router.get('/:id', auth, getTask);
router.patch('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;
