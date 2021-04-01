import express from 'express';
import { fetchAllJornalEntries, addTravelJournalEntry } from '../controllers/journalController.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', protect, fetchAllJornalEntries);
router.post('/', protect, addTravelJournalEntry)

export default router;