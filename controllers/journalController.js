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

// DELETE /api/journal/:id
// DESC controller for deleting a specific journal
// private route for logged in users
const deleteJournalEntry = asyncHandler(
    async (req, res) =>{
        const { id } = req.params;
        const journal = await Journal.findById(id);

        if(journal){
            if(req.user.id.toString() === journal.user.toString()){
                await Journal.deleteOne({_id: id})
                res.json({message: 'Entry deleted succesfully'});
            }else{
                res.status(401);
                throw new Error('Unauthorized!! you are not the owner of this journal');
            }         
        }else{
            res.status(404).json({
                message: `Entry of the id ${id} does not exist`
            })
        }
    }
)

export {
    fetchAllJornalEntries,
    addTravelJournalEntry,
    deleteJournalEntry
};