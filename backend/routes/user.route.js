import express from 'express';
import { test } from '../models/user.controller.js';


const router = express.Router();

//test API route
router.get('/test', test);

export default router;