import asyncHandler from "express-async-handler";
import Journal from '../models/journalModel.js';

// GET /api/journal
// DESC controller for fetching all travel journal entries
// private route for admin
const fetchAllJornalEntries = asyncHandler(
    async (req, res) =>{
        if(req.user.isAdmin){
            const journal = await Journal.find({});

            res.json(journal);
        }else{
            const journal = await Journal.find({user: req.user.id});

            res.json(journal);
        }
    }
)

// POST /api/journal
// DESC controller for adding a journal travel entry to places you've travelled to
// private route for logged in users
const addTravelJournalEntry = asyncHandler(
    async(req, res) =>{
        const journal = new Journal(req.body);
        journal.user = req.user.id;
        const createdJournal = await journal.save();
        res.send(createdJournal);
    }
)

export {fetchAllJornalEntries, addTravelJournalEntry};