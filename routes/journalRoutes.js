import express from 'express';
import {
    fetchAllJornalEntries,
    addTravelJournalEntry,
    deleteJournalEntry
}
    from '../controllers/journalController.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', protect, fetchAllJornalEntries);
router.post('/', protect, addTravelJournalEntry);
router.delete('/:id', protect, deleteJournalEntry);

export default router;